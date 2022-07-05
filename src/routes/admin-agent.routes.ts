import express from "express";
import { createAgent, createAdmin, createUser } from "../controller/admin-agent.controller";
import validateResource from "../middleware/validateResource";
import { createUserSchema } from "../schema/user.schema";

const router = express.Router()

router.post("/api/create/admin", validateResource(createUserSchema),createAdmin);

router.post("/api/create/user", validateResource(createUserSchema),createUser);

router.post("/api/create/agent", validateResource(createUserSchema),createAgent);



export default router
