import { useState } from "react";
import { z } from "zod";
import { ArrowUpRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

export const PROJECT_TYPES = ["Independent home", "Villa / Farmhouse", "Apartment development", "Commercial building", "Interiors only", "Renovation", "Other"];

const WHATSAPP_NUMBER = "919148837834";

const inquirySchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(80),
  phone: z.string().trim().regex(/^[0-9+\-\s()]{7,15}$/, "Invalid phone"),
  email: z.string().trim().email("Invalid email").max(255).or(z.literal("")),
  projectType: z.string().min(1, "Please choose a project type"),
  location: z.string().trim().max(120),
  plotSize: z.string().trim().max(60),
  message: z.string().trim().max(1000),
});

type Lead = z.infer<typeof inquirySchema>;

// Opens WhatsApp with the enquiry pre-filled so it reaches the Aasta team.
export const sendLeadToWhatsApp = (lead: Partial<Lead>, projectName?: string) => {
  const lines = [
    projectName ? `Enquiry about ${projectName}` : "New project enquiry",
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    lead.email && `Email: ${lead.email}`,
    lead.projectType && `Project type: ${lead.projectType}`,
    lead.location && `Location: ${lead.location}`,
    lead.plotSize && `Plot / built-up size: ${lead.plotSize}`,
    lead.message && `Message: ${lead.message}`,
  ].filter(Boolean);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener,noreferrer");
};

type Props = { open: boolean; onOpenChange: (open: boolean) => void; projectName?: string; title?: string };

const emptyLead = (projectName?: string): Lead => ({ name: "", phone: "", email: "", projectType: "", location: "", plotSize: "", message: projectName ? `I would like to know more about ${projectName}.` : "" });

export const InquiryDialog = ({ open, onOpenChange, projectName, title }: Props) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [lead, setLead] = useState<Lead>(emptyLead(projectName));

  const reset = () => {
    setErrors({});
    setLead(emptyLead(projectName));
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const result = inquirySchema.safeParse(lead);
    if (!result.success) {
      const nextErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => { nextErrors[String(issue.path[0])] = issue.message; });
      setErrors(nextErrors);
      return;
    }
    sendLeadToWhatsApp(result.data, projectName);
    toast({ title: "Thank you", description: "Your enquiry is ready to send on WhatsApp. Our team will get back to you shortly." });
    reset();
    onOpenChange(false);
  };

  const inputClass = "mt-1.5 w-full bg-transparent border-b border-ink/20 py-2.5 text-ink focus:border-copper focus:outline-none transition-colors";
  const field = (key: keyof Lead, label: string, type = "text", placeholder?: string) => (
    <div>
      <label className="text-[10px] tracking-label uppercase text-ink-soft">{label}</label>
      <input type={type} value={lead[key]} placeholder={placeholder} onChange={(event) => setLead({ ...lead, [key]: event.target.value })} className={`${inputClass} placeholder:text-ink/30`} />
      {errors[key] && <p className="mt-1 text-xs text-destructive">{errors[key]}</p>}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={(value) => { if (!value) reset(); onOpenChange(value); }}>
      <DialogContent className="max-w-2xl bg-ivory text-ink border-ink/10 p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="p-8 lg:p-10">
          <DialogHeader className="text-left space-y-2">
            <p className="text-[10px] tracking-label uppercase text-copper">Start a conversation</p>
            <DialogTitle className="font-display text-3xl text-ink font-normal">{title ?? (projectName ? `Enquire about ${projectName}` : "Tell us about your project")}</DialogTitle>
            <DialogDescription className="text-ink-soft">Share a few details and our team will get back to you shortly.</DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
            {field("name", "Full name *")}
            {field("phone", "Phone *", "tel")}
            {field("email", "Email", "email")}
            <div>
              <label className="text-[10px] tracking-label uppercase text-ink-soft">Project type *</label>
              <select value={lead.projectType} onChange={(event) => setLead({ ...lead, projectType: event.target.value })} className={inputClass}>
                <option value="">Select…</option>
                {PROJECT_TYPES.map((type) => <option key={type}>{type}</option>)}
              </select>
              {errors.projectType && <p className="mt-1 text-xs text-destructive">{errors.projectType}</p>}
            </div>
            {field("location", "Site location", "text", "e.g. Whitefield, Bangalore")}
            {field("plotSize", "Plot / built-up size", "text", "e.g. 30×40 or 2,400 sq. ft.")}
            <div className="sm:col-span-2">
              <label className="text-[10px] tracking-label uppercase text-ink-soft">Message</label>
              <textarea value={lead.message} onChange={(event) => setLead({ ...lead, message: event.target.value })} rows={3} className={`${inputClass} resize-none`} />
            </div>
            <button type="submit" className="group sm:col-span-2 mt-2 inline-flex w-fit items-center gap-3 bg-ink text-ivory px-7 py-3.5 text-[10px] tracking-label uppercase transition-all hover:bg-copper">Send enquiry <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
