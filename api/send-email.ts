// Vercel serverless function: emails website form submissions to the Aasta team via Resend.
// Required env: RESEND_API_KEY. Optional: RESEND_FROM_EMAIL, CONTACT_TO_EMAIL.
import { z } from "zod";

const MAX_RESUME_BYTES = 3 * 1024 * 1024; // Vercel caps request bodies at 4.5 MB; base64 adds ~33%.

const phone = z.string().trim().regex(/^[0-9+\-\s()]{7,15}$/, "Invalid phone");
const optional = (max: number) => z.string().trim().max(max).optional().default("");

const formSchema = z.discriminatedUnion("form", [
  z.object({
    form: z.literal("inquiry"),
    name: z.string().trim().min(2).max(80),
    phone,
    email: z.string().trim().email().max(255).or(z.literal("")).optional().default(""),
    projectType: optional(80),
    location: optional(120),
    plotSize: optional(60),
    message: optional(1000),
    projectName: optional(120),
    source: optional(60),
  }),
  z.object({
    form: z.literal("careers"),
    name: z.string().trim().min(2).max(80),
    email: z.string().trim().email().max(255),
    phone,
    role: z.string().trim().min(1).max(120),
    experience: optional(60),
    location: optional(120),
    cover: optional(3000),
    resume: z
      .object({
        filename: z.string().trim().min(1).max(200).regex(/\.(pdf|docx?)$/i, "Resume must be PDF or Word"),
        content: z.string().max(Math.ceil((MAX_RESUME_BYTES * 4) / 3) + 4),
      })
      .optional(),
  }),
  z.object({
    form: z.literal("estimate"),
    name: z.string().trim().min(2).max(80),
    email: z.string().trim().email().max(255),
    phone,
    city: z.string().trim().min(2).max(80),
    planName: z.string().trim().max(80),
    rate: z.number().nonnegative(),
    floors: z.array(z.object({ label: z.string().max(60), sqft: z.number().nonnegative() })).max(20),
    totalArea: z.number().nonnegative(),
    totalCost: z.number().nonnegative(),
  }),
]);

type FormPayload = z.infer<typeof formSchema>;

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

const buildEmail = (data: FormPayload) => {
  let subject: string;
  let rows: [string, string][];
  switch (data.form) {
    case "inquiry":
      subject = data.projectName ? `Enquiry about ${data.projectName} — ${data.name}` : `New project enquiry — ${data.name}`;
      rows = [
        ["Name", data.name],
        ["Phone", data.phone],
        ["Email", data.email],
        ["Project", data.projectName],
        ["Project type", data.projectType],
        ["Site location", data.location],
        ["Plot / built-up size", data.plotSize],
        ["Message", data.message],
        ["Submitted from", data.source],
      ];
      break;
    case "careers":
      subject = `Job application: ${data.role} — ${data.name}`;
      rows = [
        ["Name", data.name],
        ["Email", data.email],
        ["Phone", data.phone],
        ["Role of interest", data.role],
        ["Experience", data.experience],
        ["Current location", data.location],
        ["Cover note", data.cover],
        ["Resume", data.resume ? `${data.resume.filename} (attached)` : "Not provided"],
      ];
      break;
    case "estimate":
      subject = `Cost estimate request (${data.planName}) — ${data.name}`;
      rows = [
        ["Name", data.name],
        ["Email", data.email],
        ["Phone", data.phone],
        ["City", data.city],
        ["Plan", data.planName],
        ["Rate", `${inr(data.rate)} / sq.ft.`],
        ...data.floors.map((f): [string, string] => [f.label, `${f.sqft.toLocaleString("en-IN")} sq.ft. · ${inr(f.sqft * data.rate)}`]),
        ["Total area", `${data.totalArea.toLocaleString("en-IN")} sq.ft.`],
        ["Estimated total", inr(data.totalCost)],
      ];
      break;
  }

  const filled = rows.filter(([, value]) => value);
  const html = `<div style="font-family:Arial,sans-serif;color:#1f1b16">
  <h2 style="font-weight:normal;margin:0 0 16px">${escapeHtml(subject)}</h2>
  <table cellpadding="8" style="border-collapse:collapse">${filled
    .map(([label, value]) => `<tr><td style="color:#8a6a4f;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td><td style="white-space:pre-wrap">${escapeHtml(value)}</td></tr>`)
    .join("")}</table>
</div>`;
  const text = filled.map(([label, value]) => `${label}: ${value}`).join("\n");
  return { subject, html, text };
};

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return json(500, { error: "Email service is not configured." });

  let parsed;
  try {
    parsed = formSchema.safeParse(await request.json());
  } catch {
    return json(400, { error: "Invalid request." });
  }
  if (!parsed.success) return json(400, { error: "Please check the form and try again." });
  const data = parsed.data;

  if (data.form === "careers" && data.resume && Buffer.byteLength(data.resume.content, "base64") > MAX_RESUME_BYTES) {
    return json(413, { error: "Resume must be under 3 MB." });
  }

  const { subject, html, text } = buildEmail(data);
  const replyTo = "email" in data && data.email ? data.email : undefined;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL || "Aasta Lifespace Website <onboarding@resend.dev>",
      to: (process.env.CONTACT_TO_EMAIL || "studio@aastalifespace.com,aastasocials@gmail.com").split(",").map((s) => s.trim()),
      reply_to: replyTo,
      subject,
      html,
      text,
      attachments: data.form === "careers" && data.resume ? [{ filename: data.resume.filename, content: data.resume.content }] : undefined,
    }),
  });

  if (!response.ok) {
    console.error("Resend error", response.status, await response.text());
    return json(502, { error: "Could not send your message. Please try again or call us." });
  }
  return json(200, { ok: true });
}
