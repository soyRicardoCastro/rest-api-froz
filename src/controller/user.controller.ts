import { Request, Response } from "express";
import bcrypt from "bcrypt"
import {
  CreateUserInput,
  AddUniListParams,
  AddUniListInput,
  EditUserInput,
  EditUserParams
} from "../schema/user.schema";
import {
  createUser,
  findUserById,
  findUsers
} from "../service/user.service";
import UniversityModel from "../model/university.model"
import UserModel from "../model/user.model"

export async function getAllUsers(_req: Request, res: Response) {
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

export async function getCurrentUserHandler(_req: Request, res: Response) {
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

    user.universities.push(unis)

    await user.save()

    return res.status(200).send(user)
  } catch (e) {
    return res.status(500).send(e)
  }
}

export async function addOneTaskCompleted(req: Request, res: Response) {
  try {
    const { id } = req.params

    const user = await UserModel.findById(id)

    if (!user) return res.status(404).send("No user found")

    user.completedTasks += 1

    await user.save()

    return res.status(201).send("User task completed successfully")
  } catch (e) {
    return res.status(500).send(e)
  }
}

export async function updateUser(req: Request<EditUserParams, {}, EditUserInput>, res: Response) {
  try {
    const { id } = req.params
    const body = req.body

    if (body.password) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(body.password, salt);
      body.password = hash;
    }

    const userUpdated = await UserModel.findByIdAndUpdate(id, body, { new: true })

    return res.status(201).send(userUpdated)
  } catch (e) {
    return res.status(500).send(e)
  }
}
