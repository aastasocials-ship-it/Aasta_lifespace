import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Serves api/send-email.ts during `npm run dev` the way Vercel serves it in production.
const devApi = (env: Record<string, string>): Plugin => ({
  name: "dev-api",
  apply: "serve",
  configureServer(server) {
    Object.assign(process.env, env);
    server.middlewares.use("/api/send-email", async (req, res) => {
      if (req.method !== "POST") {
        res.statusCode = 405;
        res.end();
        return;
      }
      const chunks: Buffer[] = [];
      for await (const chunk of req) chunks.push(chunk as Buffer);
      const { POST } = await server.ssrLoadModule("/api/send-email.ts");
      const response: Response = await POST(
        new Request("http://localhost/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: Buffer.concat(chunks),
        }),
      );
      res.statusCode = response.status;
      res.setHeader("Content-Type", "application/json");
      res.end(await response.text());
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), devApi(loadEnv(mode, process.cwd(), ""))],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));
