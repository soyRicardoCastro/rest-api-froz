import {
  getModelForClass,
  modelOptions,
  prop,
  Severity,
  pre,
  DocumentType,
  index,
  Ref,
  plugin,
} from "@typegoose/typegoose";
import { nanoid } from "nanoid";
import bcrypt from 'bcrypt'
import autopopulate from 'mongoose-autopopulate';
import log from "../utils/logger";
import { University } from "./university.model";

export const RoleUser = ["user"]

export const privateFields = [
  "password",
  "__v",
  "verificationCode",
  "passwordResetCode",
  "verified",
];

@pre<User>("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const hash = await bcrypt.hash(this.password, 10)
  // const hash = await argon2.hash(this.password);

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
  age: number;

  @prop({ required: true })
  gender: string;

  @prop({ autopopulate: true, ref: () => University })
  universities: Ref<University>[]

  @prop({ type: () => [String], required: true, default: RoleUser})
  role: string[];

  @prop({ required: true, default: () => nanoid() })
  verificationCode: string;

  @prop()
  passwordResetCode: string | null;

  @prop({ default: false })
  verified: boolean;

  async validatePassword(this: DocumentType<User>, candidatePassword: string) {
    try {
      return await bcrypt.compare(this.password, candidatePassword);
    } catch (e) {
      log.error(e, "Could not validate password");
      return false;
    }
  }
}

const UserModel = getModelForClass(User);

export default UserModel;
