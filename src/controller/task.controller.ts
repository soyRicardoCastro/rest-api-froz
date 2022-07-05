import { Request, Response } from "express"
import { CreateTaskInput, EditTaskParams, EditTaskInput } from "../schema/task.schema"
import { createTask, findTasks, findTaskById, editTask } from "../service/task.service"

export async function getAllTasks(_req: Request, res: Response) {
  try {
    const tasks = await findTasks()

    if (!tasks) return res.status(404).send("No tasks found")

    return res.status(200).send(tasks)
  } catch (e) {
    console.error(e)
    return res.status(500).send(e)
  }
}

export async function getTaskById(req: Request, res: Response) {
  try {
    const { id } = req.params
    const task = await findTaskById(id)

    if (!task) return res.status(404).send("No task found")

    return res.status(200).send(task)
  } catch (e) {
    return res.status(500).send(e)
  }
}

export async function createTaskHandler(req: Request<{}, {}, CreateTaskInput>, res: Response) {
  try {
    const body = req.body
    await createTask(body)
    return res.status(200).send("Task successfully created")
  } catch (e: any) {
    if (e.code === 11000) {
      return res.status(409).send("Task already exist")
    }
  }
}

export async function editTaskHandler(req: Request<EditTaskParams, {}, EditTaskInput>, res: Response) {
  try {
    const { id } = req.params
    const body = req.body

    await editTask(id, body)
    return res.status(201).send("Task successfully updated")
  } catch (e) {
    return res.status(500).send(e)
  }
}
