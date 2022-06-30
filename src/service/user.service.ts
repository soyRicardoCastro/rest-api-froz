import UserModel, { User } from "../model/user.model";

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

export function userUniversityList(id: string, uid: string) {
  const user = UserModel.findByIdAndUpdate(id, {

  })


}
