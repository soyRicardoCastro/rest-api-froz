import express from "express";
import {
  createUserHandler,
  getCurrentUserHandler,
  getUserById,
  getAllUsers,
  AddUniversityList,
  updateUser,
  addOneTaskCompleted,
  deleteUser,
  askQuestions 
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

router.put("/api/users/college-fit/:id", askQuestions)

router.post("/api/add-user-uni/:id", validateResource(addUniToList),AddUniversityList)

router.delete("/api/users/:id", deleteUser)

export default router;
