import { Request, Response } from "express";
import { CreateUserInput } from "../schema/user.schema";
import UserModel from "../model/user.model";

export async function createAgent(req: Request<{},{},CreateUserInput>, res: Response) {
  try {
    const body = req.body

    const agent = await UserModel.create(body)

    agent.role = ["agent"]

    await agent.save()

    return res.status(200).send("Agent created successfully")
  } catch (e) {
    return res.status(500).send(e)
  }
}

export async function createAdmin(req: Request<{}, {}, CreateUserInput>, res: Response) {
  try {
    const body = req.body

    const admin = await UserModel.create(body)

    admin.role = ["admin"]

    await admin.save()

    return res.status(200).send("Admin created successfully")
  } catch (e) {
    return res.status(500).send(e)
  }
}

export async function createUser(req: Request<{}, {}, CreateUserInput>, res: Response) {
  try {
    const body = req.body

    const user = await UserModel.create(body)

    user.role = ["user"]

    await user.save()

    return res.status(200).send("User created successfully")
  } catch (e) {
    return res.status(500).send(e)
  }
}
