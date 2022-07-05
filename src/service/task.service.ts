import TaskModel, { Task } from "../model/task.model";

export function createTask(input: Partial<Task>) {
  return TaskModel.create(input)
}

export function findTaskById(id: string) {
  return TaskModel.findById(id)
}

export function findTasks() {
  return TaskModel.find()
}

export function editTask(id: string, body: any) {
  return TaskModel.findByIdAndUpdate({ id }, { body }, { new: true })
}
