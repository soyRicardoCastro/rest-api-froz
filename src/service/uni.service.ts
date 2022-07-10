import UniversityModel from "../model/university.model"

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

export function editUni(id: string, body: any) {
  return UniversityModel.findByIdAndUpdate(id, body, { new: true })
}
