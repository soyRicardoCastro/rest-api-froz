import express from "express";
import {
  createUserHandler,
  getCurrentUserHandler,
  getUserById,
  getAllUsers,
  AddUniversityList,
  updateUser,
  addOneTaskCompleted
} from "../controller/user.controller";
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResource";
import { createUserSchema, addUniToList , editUserSchema } from "../schema/user.schema";

const router = express.Router();

router.post("/api/users/:id/task", addOneTaskCompleted)

router.post(
  "/api/users",
  validateResource(createUserSchema),
  createUserHandler
);
router.get("/api/users/me", requireUser, getCurrentUserHandler);

router.get("/api/users", getAllUsers)

router.get("/api/users/:id", getUserById)

router.put("/api/users/:id", validateResource(editUserSchema), updateUser)

router.post("/api/add-user-uni/:id", validateResource(addUniToList),AddUniversityList)

export default router;
