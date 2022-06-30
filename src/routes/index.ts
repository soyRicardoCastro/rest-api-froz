import express from "express";
import user from "./user.routes";
import auth from "./auth.routes";
import uni from "./uni.routes"
import UniversityModel from "../model/university.model";

const router = express.Router();

router.get("/healthcheck", (_, res) => res.sendStatus(200));

router.use(user);
router.use(auth);
router.use(uni);

export default router;
