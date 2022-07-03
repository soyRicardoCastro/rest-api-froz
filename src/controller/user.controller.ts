import { Request, Response } from "express";
import { CreateUserInput, AddUniListParams, AddUniListInput } from "../schema/user.schema";
import {
  createUser,
  findUserById,
  findUsers
} from "../service/user.service";
import UniversityModel from "../model/university.model"
import UserModel from "../model/user.model"

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await findUsers()

    if (!users) return res.status(404).send("No users found")

    return res.status(200).json(users)
  } catch (e) {
    console.error(e)
    return res.status(500).send("Internal server error")
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const { id } = req.params
    const user = await findUserById(id)

    if (!user) return res.status(404).send("No user found")

    return res.status(200).json(user)
  } catch (e) {
    return res.status(500).send(e)
  }
}

export async function getCurrentUserHandler(req: Request, res: Response) {
  return res.send(res.locals.user);
}

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) {
  const body = req.body;

  try {
    await createUser(body);

    return res.send("User successfully created");
  } catch (e: any) {
    if (e.code === 11000) {
      return res.status(409).send("Account already exists");
    }

    return res.status(500).send(e);
  }
}

export async function AddUniversityList(req: Request<AddUniListParams, {}, AddUniListInput>, res: Response) {
  try {
    const { id } = req.params
    const { universities } = req.body

    const unisFound = await UniversityModel.find({ name: universities })

    if (!unisFound) return res.status(404).send('No unis found')

    const user = await UserModel.findById(id)

    if (!user) return res.status(404).send('No user found')

    const unis = unisFound.map(uni => uni._id)

    user.universities = unis
    await user.save()

    return res.status(200).json({user})
  } catch(e) {
    return res.status(500).send(e)
  }
}
