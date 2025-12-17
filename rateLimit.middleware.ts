import { Request, Response, NextFunction } from "express";
import { redisClient } from "../redis/client";

const WINDOW_SECONDS = 60; // 1 minute
const MAX_REQUESTS = 5;    // per minute per API key

export async function rateLimiter(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const apiKey = (req as any).apiKey;

  if (!apiKey) {
    return res.status(500).json({ message: "API key context missing" });
  }

  const redisKey = `rate:${apiKey.id}`;

  const current = await redisClient.incr(redisKey);

  if (current === 1) {
    await redisClient.expire(redisKey, WINDOW_SECONDS);
  }

  if (current > MAX_REQUESTS) {
    return res.status(429).json({
      message: "Rate limit exceeded",
      retryAfter: WINDOW_SECONDS
    });
  }

  next();
}
