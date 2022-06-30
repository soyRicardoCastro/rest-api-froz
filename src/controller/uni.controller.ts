import { Request, Response } from "express"
import { findAllUni, createUni, findUniById } from "../service/uni.service"
import { CreateUniversityInput, EditUniversityParams } from "../schema/uni.schema"

export async function getAllUni(req: Request, res: Response) {
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
    return res.status(409).json({message: "University already exists", e});
    }

    return res.status(500).send(e);
  }
}
