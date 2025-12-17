import { Request, Response } from "express";
import { AppDataSource } from "../db/data-source";
import { ApiKey } from "../entities/api-key.entity";
import { generateApiKey, hashApiKey } from "../utils/apiKey";

export const createApiKey = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "name is required" });
  }

  const rawKey = generateApiKey();
  const hashedKey = hashApiKey(rawKey);

  const repo = AppDataSource.getRepository(ApiKey);

  const apiKey = repo.create({
    name,
    keyHash: hashedKey
  });

  await repo.save(apiKey);

  return res.status(201).json({
    apiKey: rawKey,
    id: apiKey.id
  });
};
