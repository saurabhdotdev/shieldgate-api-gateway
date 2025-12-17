import { Router } from "express";
import { createApiKey } from "./api-key.controller";

const router = Router();

router.post("/keys", createApiKey);

export default router;
