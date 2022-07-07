import {
  getModelForClass,
  modelOptions,
  prop,
  Severity,
  pre,
  index,
  Ref,
  plugin,
} from "@typegoose/typegoose";
import bcrypt from 'bcrypt'
import autopopulate from 'mongoose-autopopulate';
import log from "../utils/logger";
import { University } from "./university.model";

export const RoleUser = ["user"]
export const privateFields = ["password",];

@pre<User>("save", async function () {
  if (!this.isModified("password")) {
    return
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  return;
})
@index({ email: 1 })
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@plugin(autopopulate)
export class User {
  @prop({ lowercase: true, required: true, unique: true })
  email: string;

  @prop({ required: true })
  firstName: string;

  @prop({ required: true })
  lastName: string;

  @prop({ required: true })
  password: string;

  @prop({ required: true })
  address: string;

  @prop({ required: true })
  phone: string;

  @prop({ required: true })
  age: string;

  @prop({ required: true })
  gender: string;

  @prop({ autopopulate: true, ref: () => University })
  universities: Ref<University>[]

  @prop({ default: 0 })
  completedTasks: number;

  @prop({ type: () => [String], required: true, default: RoleUser})
  role: string[];

  async validatePassword(password: string, candidatePassword: string) {
    try {
      return await bcrypt.compare(password, candidatePassword);
    } catch (e) {
      log.error(e, "Could not validate password");
      return false;
    }
  }
}

const UserModel = getModelForClass(User);

export default UserModel;
