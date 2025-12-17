import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../db/data-source";
import { ApiKey } from "../entities/api-key.entity";
import { hashApiKey } from "../utils/apiKey";

export async function apiKeyAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const apiKey = req.header("x-api-key");

  if (!apiKey) {
    return res.status(401).json({ message: "API key missing" });
  }

  const hashedKey = hashApiKey(apiKey);

  const repo = AppDataSource.getRepository(ApiKey);

  const key = await repo.findOne({
    where: { keyHash: hashedKey, isActive: true }
  });

  if (!key) {
    return res.status(401).json({ message: "Invalid API key" });
  }

  (req as any).apiKey = key;

  next();
}
