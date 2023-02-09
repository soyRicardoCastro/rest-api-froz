import { object, string, TypeOf, array } from "zod";

export const divisionUniversitySchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    competitionLevel: array(
      string({
        required_error: "competitionLevel is required",
      })
    ).min(1, { message: "you need add a competitionLevel" }),
  }),
});
export type CreateDivisionUniversityInput = TypeOf<
  typeof divisionUniversitySchema
>["body"];
