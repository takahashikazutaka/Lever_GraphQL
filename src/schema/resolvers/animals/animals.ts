import { IDataModelSet } from "../../../models";

export const resolvers = {
  Animal: {
    __resolveType(obj, args, context, info) {
      if (obj.species === "MOUSE") {
        return "Mouse";
      }
      return null;
    },
    async genotype(obj, args, context, info) {
      if (obj.genotype) {
        const models: IDataModelSet = context.models;
        return await models.AnimalModel.findOne(obj.genotype);
      }
      return null;
    },
    async measurements(obj, args, context, info) {
      if (obj.measurements) {
        const models: IDataModelSet = context.models;
        return await models.MeasurementModel.findMany(obj.measurements);
      }
      return [];
    },
    async phenotypeLinks(obj, args, context, info) {
      if (obj.phenotypeLinks) {
        const models: IDataModelSet = context.models;
        return await models.PhenotypeLinkModel.findMany(obj.phenotypeLinks);
      }
      return [];
    }
  },
  Mouse: {
    async genotype(obj, args, context, info) {
      if (obj.genotype) {
        const models: IDataModelSet = context.models;
        return await models.AnimalModel.findOne(obj.genotype);
      }
      return null;
    },
    async measurements(obj, args, context, info) {
      if (obj.measurements) {
        const models: IDataModelSet = context.models;
        return await models.MeasurementModel.findMany(obj.measurements);
      }
      return [];
    },
    async phenotypeLinks(obj, args, context, info) {
      if (obj.phenotypeLinks) {
        const models: IDataModelSet = context.models;
        return await models.PhenotypeLinkModel.findMany(obj.phenotypeLinks);
      }
      return [];
    }
  },
  Measurement: {
    async type(obj, args, context, info) {
      if (obj.type) {
        const models: IDataModelSet = context.models;
        return await models.MeasurementTypeModel.findOne(obj.type);
      }
      return null;
    }
  },
  BreedingEvent: {
    async mom(obj, args, context, info) {
      if (obj.mom) {
        const models: IDataModelSet = context.models;
        return await models.AnimalModel.findOne(obj.mom);
      }
      return null;
    },
    async dad(obj, args, context, info) {
      if (obj.dad) {
        const models: IDataModelSet = context.models;
        return await models.AnimalModel.findOne(obj.dad);
      }
      return null;
    },
    async offspring(obj, args, context, info) {
      if (obj.offspring) {
        const models: IDataModelSet = context.models;
        return models.AnimalModel.findMany(obj.offspring);
      }
      return [];
    }
  },
  Colony: {
    async animals(obj, args, context, info) {
      if (obj.animals) {
        const models: IDataModelSet = context.models;
        return models.AnimalModel.findMany(obj.animals);
      }
      return [];
    }
  },
  PhenotypeLink: {
    async phenotype(obj, args, context, info) {
      if (obj.phenotype) {
        const models: IDataModelSet = context.models;
        return await models.PhenotypeModel.findOne(obj.phenotype);
      }
      return null;
    }
  }
};
