import {
  getModelForClass,
  modelOptions,
  prop,
  Severity,
} from "@typegoose/typegoose";

export class Career {
  @prop({ default: "" })
  name: string;
}

export class Coach {
  @prop({ default: "" })
  name: string;

  @prop({ default: "" })
  contact: string;
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
  url: string;

  @prop()
  division: string;

  @prop({ type: () => Career, required: false, default: [] })
  careers: Career[];

  @prop({ type: () => Coach, required: false, default: [] })
  coachs: Coach[];
}

const UniversityModel = getModelForClass(University);

export default UniversityModel;
