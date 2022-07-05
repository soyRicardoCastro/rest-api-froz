import { getModelForClass, prop } from "@typegoose/typegoose";

export class Task {
  @prop({ required: true, unique: true })
  name: string;

  @prop({ required: true })
  short: string

  @prop({ required: true, unique: true})
  description: string
}

const TaskModel = getModelForClass(Task, {
  schemaOptions: {
    timestamps: true,
  },
});

export default TaskModel;
