import { object, string, TypeOf, array } from "zod";

export const createUniversitySchema = object({
  body: object({
    name: string({
      required_error: "Name is required"
    }),
    state: string({
      required_error: "State is required"
    }),
    division: string({
      required_error: "Division is required"
    }),
    academicRank: string({
      required_error: "Academic Rank is required"
    }),
    careers: array(object({
      name: string({
        required_error: "Career Name is required"
      })
    })).optional(),
    coachs: array(object({
      name: string({
        required_error: "Coach Name is required"
      }),
      email: string({
        required_error: "Email is required"
      }).email("Not a valid email"),
      phone: string().optional(),
      gender: string().optional()
    })).optional(),
  })
})

export const editUniversitySchema = object({
  params: object({
    id: string({
      required_error: "University id is required"
    })
  }),
  body: object({
    name: string().optional(),
    state: string().optional(),
    division: string().optional(),
    academicRank: string().optional(),
    careers: array(object({
      name: string().optional()
    })).optional(),
    coachs: array(object({
      name: string().optional(),
      email: string().email("Not a valid email").optional(),
      phone: string().optional(),
      gender: string().optional()
    })).optional(),
  })
})

export type CreateUniversityInput = TypeOf<typeof createUniversitySchema>["body"];

export type EditUniversityInput = TypeOf<typeof editUniversitySchema>["body"]
export type EditUniversityParams = TypeOf<typeof editUniversitySchema>["params"]
