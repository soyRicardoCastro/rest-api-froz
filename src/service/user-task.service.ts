import UserTaskModel, { UserTask } from "../model/user-task.model"

 export function createUserTask(input: any) {
  const user = UserTaskModel.create()

  return UserTaskModel.create(input)
 }

 export function findUserTasks() {
  return UserTaskModel.find()
 }

 export function findUserTaskById(id: string) {
  return UserTaskModel.findById(id)
 }
