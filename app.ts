import express from "express";
import apiKeyRoutes from "./keys/api-key.routes";
import protectedRoutes from "./protected.routes";

export const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", apiKeyRoutes);
app.use("/api", protectedRoutes);
