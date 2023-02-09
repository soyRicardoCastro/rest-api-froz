import { Request, Response } from "express";
import CollegeFitModel from "../model/collegeFit.model";
import { createCollegeFitDivision } from "../service/collegeFit.service";
import { CreateDivisionUniversityInput } from "../schema/division.schema";

export const getDivision = async (req: Request, res: Response) => {
  try {
    const division = await CollegeFitModel.find({});
    console.log(division);
    if (!division) throw new Error("Division not found");

    return res.status(200).json(division);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

export async function createDivisionUniversity(
  req: Request<{}, {}, CreateDivisionUniversityInput>,
  res: Response
) {
  try {
    const body = req.body;
    await createCollegeFitDivision(body);

    return res.status(201).send("University division successfully created");
  } catch (e: any) {
    console.log(e);
    if (e.code === 11000) {
      return res
        .status(409)
        .send({ message: "University division already exists", e });
    }

    return res.status(500).send(e);
  }
}
