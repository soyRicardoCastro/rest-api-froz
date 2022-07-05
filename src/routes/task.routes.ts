import express from "express";
import { getAllTasks, getTaskById, createTaskHandler, editTaskHandler } from "../controller/task.controller"
import validateResource from "../middleware/validateResource";
import { createTaskSchema, editTaskSchema } from "../schema/task.schema"

const router = express.Router();

router.get("/api/tasks", getAllTasks);

router.post("/api/tasks", validateResource(createTaskSchema), createTaskHandler);

router.get("/api/tasks/:id", getTaskById);

router.put("/api/tasks/:id", validateResource(editTaskSchema), editTaskHandler);

export default router
