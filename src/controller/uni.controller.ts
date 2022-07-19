import { Request, Response } from "express"
import {
  findAllUni,
  createUni,
  findUniById,
  editUni
} from "../service/uni.service"
import {
  CreateUniversityInput,
  EditUniversityParams,
  EditUniversityInput
} from "../schema/uni.schema"
import UniversityModel from '../model/university.model'

export async function getAllUni(_req: Request, res: Response) {
  try {
    const unis = await findAllUni()

    if(!unis) return res.status(404).send("No unis found")

    return res.status(200).json(unis)
  } catch(e) {
    return res.status(500).send(e)
  }
}

export async function getUni(req: Request<EditUniversityParams>, res: Response){
  try {
    const { id } = req.params

    const uni = await findUniById(id)

    if (!uni) return res.status(404).send("No university found")

    return res.status(200).json(uni)
  } catch(e) {
    return res.status(500).send(e)
  }
}

export async function createUniversity(req: Request<{}, {}, CreateUniversityInput>, res: Response) {
  try {
    const body = req.body
    await createUni(body)

    return res.status(201).send("University successfully created")
  } catch (e: any) {
    if (e.code === 11000) {
    return res.status(409).send({ message: "University already exists", e });
    }

    return res.status(500).send(e);
  }
}

export async function editUniversity(req: Request<EditUniversityParams, {}, EditUniversityInput>, res: Response) {
  try {
    const { id } = req.params
    const body = req.body

    await editUni(id, body)

    return res.status(201).send("University updated successfully")
  } catch (e) {
    return res.status(500).send(e)
  }
}

export async function deleteUniversity(req: Request, res: Response) {
  try {
    await UniversityModel.findByIdAndDelete(req.params.id)
    return res.status(201).send("University deleted successfully")
  } catch (e) {
    return res.status(500).send(e)
  }
}
