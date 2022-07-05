import { Request, Response } from "express"
import { findUserTasks, findUserTaskById } from "../service/user-task.service"
import { CreateUserTaskInput } from "../schema/user-task.schema"
import UserModel from "../model/user.model"
import TaskModel from "../model/task.model"
import UserTaskModel from "../model/user-task.model"

export async function getUserTasks(_req: Request, res: Response) {
  try {
    const users = await findUserTasks()

    if (!users) return res.status(404).send("No Users Tasks")

    return res.status(200).send(users)
  } catch (e) {
    return res.status(500).send(e)
  }
}

export async function getUserTaskById(req: Request, res: Response) {
  try {
    const { id } = req.params

    const user = await findUserTaskById(id)

    if (!user) return res.status(404).send("No user task found")

    return res.status(200).send(user)
  } catch (e) {
    return res.status(500).send(e)
  }
}

export async function createUserTaskHandler(req: Request<{}, {}, CreateUserTaskInput>, res: Response) {
  try {
    const { userId, taskId } = req.body

    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).send("No user found");

    const task = await TaskModel.findById(taskId);
    if (!task) return res.status(404).send("No task found");

    const TaskStatus = {
      task: task._id,
      done: true
    }

    await UserTaskModel.create({
      user: user._id,
      taskStatus: TaskStatus,
    })

    return res.status(201).send("User Task created Successfully")
  } catch (e) {
    return res.status(500).send(e)
  }
}

export async function addUserTaskDone(req: Request<{}, {}, CreateUserTaskInput>, res: Response) {
  try {
    const{ userId, taskId } = req.body
    const userData = await findUserTaskById(userId)
    if (!userData) return res.status(404).send("No user found")

    const taskFound = await TaskModel.findById(taskId)
    if (!taskFound) return res.status(404).send("No task found")

    const taskToAdd = {
      task: taskFound._id,
      done: true
    }

    userData.taskStatus.push(taskToAdd)

    await userData.save()

    return res.status(200).send("Task done addedd successfully")
  } catch (e) {
    return res.status(500).send(e)
  }
}
