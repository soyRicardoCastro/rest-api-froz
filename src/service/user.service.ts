import UserModel, { User } from "../model/user.model";
import UniversityModel, { University } from "../model/university.model"
import { DocumentType } from "@typegoose/typegoose";

export function createUser(input: Partial<User>) {
  return UserModel.create(input);
}

export function findUserById(id: string) {
  return UserModel.findById(id);
}

export function findUserByEmail(email: string) {
  return UserModel.findOne({ email });
}

export function findUsers() {
  return UserModel.find()
}
