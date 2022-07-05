import express from "express";
import user from "./user.routes";
import auth from "./auth.routes";
import uni from "./uni.routes";
import task from "./task.routes";
import userTask from "./user-task.routes";
import adminAgent from "./admin-agent.routes";

const router = express.Router();

router.get("/healthcheck", (_, res) => res.sendStatus(200));

router.use(user);
router.use(auth);
router.use(uni);
router.use(task);
router.use(userTask);
router.use(adminAgent);

export default router;
