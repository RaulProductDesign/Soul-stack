import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";

export function createServer() {
  const app = express();

  // ✅ Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // ✅ Public API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // ✅ Serve static client build (if needed)
  app.use(express.static("dist/spa"));

  // Fallback to index.html for SPA routing
  app.get("*", (_req, res) => {
    res.sendFile("index.html", { root: "dist/spa" });
  });

  return app;
}
