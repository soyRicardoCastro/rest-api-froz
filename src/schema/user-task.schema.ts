import { string, object, TypeOf } from "zod";

export const createUserTaskSchema = object({
  body: object({
    userId: string({ required_error: "User id is required" }),
    taskId: string({ required_error: "Task id is required" })
  })
})

export type CreateUserTaskInput = TypeOf<typeof createUserTaskSchema>["body"]
