import UniversityModel, { University } from "../model/university.model"

export function findAllUni() {
  return UniversityModel.find()
}

export function findUniById(id: string) {
  return UniversityModel.findById(id)
}

export function findUniByName(name: string) {
  return UniversityModel.findOne({ name })
}

export function createUni(input: any) {
  return UniversityModel.create(input)
}
