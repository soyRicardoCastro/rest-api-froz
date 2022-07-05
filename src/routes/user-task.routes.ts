import express from "express";
import {
  getUserTasks,
  getUserTaskById,
  createUserTaskHandler,
  addUserTaskDone
} from "../controller/user-task.controller";
import validateResource from "../middleware/validateResource";
import { createUserTaskSchema } from "../schema/user-task.schema";

const router = express.Router();

router.get("/api/user-tasks", getUserTasks);

router.get("/api/user-tasks/:id", getUserTaskById);

router.post("/api/user-tasks", validateResource(createUserTaskSchema), createUserTaskHandler);

router.put("/api/user-tasks", validateResource(createUserTaskSchema), addUserTaskDone);


export default router
