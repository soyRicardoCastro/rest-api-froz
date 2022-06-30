import express from "express";
import {
  createUserHandler,
  getCurrentUserHandler,
  getUserById,
  getAllUsers
} from "../controller/user.controller";
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResource";
import {
  createUserSchema,
  verifyUserSchema,
} from "../schema/user.schema";

const router = express.Router();

router.post(
  "/api/users",
  validateResource(createUserSchema),
  createUserHandler
);
router.get("/api/users/me", requireUser, getCurrentUserHandler);

router.get("api/users", getAllUsers)

router.get("/api/users/:id", getUserById)

export default router;
