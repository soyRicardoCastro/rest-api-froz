import express from "express";
import {
  createSessionHandler,
  refreshAccessTokenHandler,
  login
} from "../controller/auth.controller";
import validateResource from "../middleware/validateResource";
import { createSessionSchema } from "../schema/auth.schema";

const router = express.Router();

router.post(
  "/api/sessions",
  validateResource(createSessionSchema),
  createSessionHandler
);

router.post("/api/sessions/refresh", refreshAccessTokenHandler);

router.post("/api/login", validateResource(createSessionSchema), login)

export default router;
