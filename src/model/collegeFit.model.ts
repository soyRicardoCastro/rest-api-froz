import { getModelForClass, prop } from "@typegoose/typegoose";

export class CollegeFit {
  @prop({ required: true, unique: true })
  name: string;

  @prop({ required: true })
  competitionLevel: Array<string>;
}

const CollegeFitModel = getModelForClass(CollegeFit, {
  schemaOptions: {
    timestamps: true,
  },
});

export default CollegeFitModel;
