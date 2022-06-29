import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

class Career {
  @prop()
  name: string;
}

class Coach {
  @prop({ unique: true })
  name: string;

  @prop({ unique: true })
  email: string;

  @prop({ unique: true })
  phone: string;

  @prop()
  gender: string;
}

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class University {
  @prop({ required: true, unique: true })
  name: string;

  @prop({ required: true })
  state: string;

  @prop()
  division: string;

  @prop()
  academicRank: string;

  @prop({ type: () => Career })
  careers: Career[]

  @prop({ type: () => Coach })
  coachs: Coach[]
}

const UniversityModel = getModelForClass(University)

export default UniversityModel
