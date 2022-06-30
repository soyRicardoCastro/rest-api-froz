import express from "express"
import { getAllUni, getUni, createUniversity } from "../controller/uni.controller"
import { createUniversitySchema } from "../schema/uni.schema"
import validateResource from "../middleware/validateResource";

const router = express.Router()

router.get("/api/unis", getAllUni)

router.get("/api/unis/:id", getUni)

router.post("/api/unis", validateResource(createUniversitySchema),createUniversity)

export default router
