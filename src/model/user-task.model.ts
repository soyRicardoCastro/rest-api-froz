import {
  getModelForClass,
  prop,
  Ref,
  plugin,
  modelOptions,
  Severity
} from "@typegoose/typegoose";
import autopopulate from "mongoose-autopopulate"
import { User } from "./user.model";
import { Task } from "./task.model";

class TaskStatus {
  @prop({ autopopulate: true, ref: () => Task })
  task: Ref<Task>;

  @prop({ default: false })
  done: boolean
}

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@plugin(autopopulate)
export class UserTask {
  @prop({ autopopulate: true, ref: () => User })
  user: Ref<User>;

  @prop({ autopopulate: true, type: () => TaskStatus })
  taskStatus: TaskStatus[];
}

const UserTaskModel = getModelForClass(UserTask);

export default UserTaskModel;
