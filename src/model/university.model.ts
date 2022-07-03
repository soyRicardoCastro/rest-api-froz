import { getModelForClass, modelOptions, prop, Severity } from "@typegoose/typegoose";

export class Career {
  @prop()
  name: string;
}

export class Coach {
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
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
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

  @prop()
  careers: string[]

  @prop({ type: () => Coach })
  coachs: Coach[]
}

const UniversityModel = getModelForClass(University)

export default UniversityModel
