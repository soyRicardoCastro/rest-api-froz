import { getModelForClass, modelOptions, prop, Severity } from "@typegoose/typegoose";

export class Career {
  @prop()
  name: string;
}

export class Coach {
  @prop()
  name: string;

  @prop({ default: '' })
  email: string;

  @prop({ default: '' })
  phone: string;

  @prop({ default: '' })
  gender: string;
}

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class University {
  @prop()
  name: string;

  @prop()
  state: string;

  @prop()
  division: string;

  @prop()
  academicRank: string;

  @prop({ type: () => Career, required: false, default: [] })
  careers: Career[]

  @prop({ type: () => Coach, required: false, default: [] })
  coachs: Coach[]
}

const UniversityModel = getModelForClass(University)

export default UniversityModel
