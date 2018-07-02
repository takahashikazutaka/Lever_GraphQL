import { IDataModelSet } from "../../../../models";

export const resolvers = {
  Mutation: {
    // General create one mutations
    async mMouse(obj, args, context, info) {
      const models: IDataModelSet = context.models;
      args.input["species"] = "MOUSE";
      console.log(args.input);
      return await models.AnimalModel.saveOne(args.input);
    },
    async mMeasurement(obj, args, context, info) {
      const models: IDataModelSet = context.models;
      console.log(args.input);
      return await models.MeasurementModel.saveOne(args.input);
    },
    async mMeasurementType(obj, args, context, info) {
      const models: IDataModelSet = context.models;
      console.log(args.input);
      return await models.MeasurementTypeModel.saveOne(args.input);
    },
    async mBreedingEvent(obj, args, context, info) {
      const models: IDataModelSet = context.models;
      console.log(args.input);
      return await models.BreedingEventModel.saveOne(args.input);
    },
    async mColony(obj, args, context, info) {
      const models: IDataModelSet = context.models;
      console.log(args.input);
      return await models.ColonyModel.saveOne(args.input);
    },
    async mPhenotype(obj, args, context, info) {
      const models: IDataModelSet = context.models;
      console.log(args.input);
      return await models.PhenotypeModel.saveOne(args.input);
    },
    async mPhenotypeLink(obj, args, context, info) {
      const models: IDataModelSet = context.models;
      console.log(args.input);
      return await models.PhenotypeLinkModel.saveOne(args.input);
    }
  }
};
