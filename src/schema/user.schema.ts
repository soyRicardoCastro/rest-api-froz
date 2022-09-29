import { object, string, TypeOf, array, any } from "zod";

export const createUserSchema = object({
  body: object({
    firstName: string({
      required_error: "First name is required",
    }),
    lastName: string({
      required_error: "Last name is required",
    }),
    password: string({
      required_error: "Password is required",
    }).min(6, "Password is too short - should be min 6 chars"),
    passwordConfirmation: string({
      required_error: "Password confirmation is required",
    }),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
    age: string({
      required_error: "Age is required"
    }),
    gender: string({
      required_error: "Gender is required"
    }),
    address: string({
      required_error: "Address is required"
    }),
    role: array(string()).optional()
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  }),
});

export const editUserSchema = object({
  params: object({
    id: string({
      required_error: "Need id of user"
    })
  }),
  body: object({
    firstName: string().optional(),
    lastName: string().optional(),
    password: string().min(6, "Password is too short - should be min 6 chars").optional(),
    email: string().email("Not a valid email").optional(),
    age: string().optional(),
    gender: string().optional(),
    address: string().optional(),
    role: array(string()).optional(),
    schedule: any(),
    questions: array(any())
  }),
});

export const addUniToList = object({
  params: object({
    id: string({
      required_error: "Need user id"
    })
  }),
  body: object({
    universities: array(string())
  })
})

export type CreateUserInput = TypeOf<typeof createUserSchema>["body"]

export type EditUserInput = TypeOf<typeof editUserSchema>["body"]
export type EditUserParams = TypeOf<typeof editUserSchema>["params"]

export type AddUniListInput = TypeOf<typeof addUniToList>["body"]
export type AddUniListParams = TypeOf<typeof addUniToList>["params"]
