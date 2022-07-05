import { object, string, TypeOf } from "zod";

export const createTaskSchema = object({
  body: object({
    name: string({
      required_error: "Task name is required"
    }),
    short: string({
      required_error: "A short description is required"
    }),
    description: string({
      required_error: "Complete description is required"
    })
  })
})

export const editTaskSchema = object({
  params: object({
    id: string({
      required_error: "Task id is required"
    })
  }),
  body: object({
    name: string().optional(),
    short: string().optional(),
    description: string().optional()
  })
})

export type CreateTaskInput = TypeOf<typeof createTaskSchema>["body"]

export type EditTaskParams = TypeOf<typeof editTaskSchema>["params"]

export type EditTaskInput = TypeOf<typeof editTaskSchema>["body"]
