import express from "express"
import { getAllUni, getUni, createUniversity, editUniversity } from "../controller/uni.controller"
import { createUniversitySchema, editUniversitySchema } from "../schema/uni.schema"
import validateResource from "../middleware/validateResource";

const router = express.Router()

router.get("/api/unis", getAllUni)

router.get("/api/unis/:id", getUni)

router.post("/api/unis", validateResource(createUniversitySchema),createUniversity)

router.put("/api/unis/:id", validateResource(editUniversitySchema), editUniversity)

export default router
