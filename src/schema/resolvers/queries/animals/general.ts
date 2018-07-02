import { IDataModelSet } from "../../../../models";

export const resolvers = {
  Query: {
    // General get all queries
    async qAnimals(obj, args, context, info) {
      const models: IDataModelSet = context.models;
      return await models.AnimalModel.findAll(args.species || []);
    },
    async qMeasurements(obj, args, context, info) {
      const models: IDataModelSet = context.models;
      return await models.MeasurementModel.findAll();
    },
    async qMeasurementTypes(obj, args, context, info) {
      const models: IDataModelSet = context.models;
      return await models.MeasurementTypeModel.findAll();
    },
    async qBreedingEvents(obj, args, context, info) {
      const models: IDataModelSet = context.models;
      return await models.BreedingEventModel.findAll();
    },
    async qColonies(obj, args, context, info) {
      const models: IDataModelSet = context.models;
      return await models.ColonyModel.findAll();
    },
    async qGenotypes(obj, args, context, info) {
      const models: IDataModelSet = context.models;
      return await models.GenotypeModel.findAll();
    },
    async qPhenotypes(obj, args, context, info) {
      const models: IDataModelSet = context.models;
      return await models.PhenotypeModel.findAll();
    },
    async qPhenotypeLinks(obj, args, context, info) {
      const models: IDataModelSet = context.models;
      return await models.PhenotypeLinkModel.findAll();
    }
  }
};
