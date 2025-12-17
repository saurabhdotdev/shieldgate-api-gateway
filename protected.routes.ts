import { Router } from "express";
import { apiKeyAuth } from "./auth/apiKey.middleware";
import { rateLimiter } from "./ratelimiter/rateLimit.middleware";

const router = Router();

router.get(
  "/protected",
  apiKeyAuth,
  rateLimiter,
  (_req, res) => {
    res.json({ message: "Request allowed" });
  }
);

export default router;
