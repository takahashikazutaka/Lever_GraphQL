import { IDataModelSet } from "../../../../models";

export const resolvers = {
  Mutation: {
    // General create one mutations
    async mCompetency(obj, args, context, info) {
      const models: IDataModelSet = context.models;
      console.log(args.input);
      return await models.CompetencyModel.saveOne(args.input);
    },
    async mCompetencyLink(obj, args, context, info) {
      const models: IDataModelSet = context.models;
      console.log(args.input);
      return await models.CompetencyLinkModel.saveOne(args.input);
    },
    async mEvent(obj, args, context, info) {
      const models: IDataModelSet = context.models;
      console.log(args.input);
      return await models.EventModel.saveOne(args.input);
    },
    async mProject(obj, args, context, info) {
      const models: IDataModelSet = context.models;
      console.log(args.input);
      return await models.ProjectModel.saveOne(args.input);
    },
    async mUser(obj, args, context, info) {
      const models: IDataModelSet = context.models;
      console.log(args.input);
      return await models.UserModel.saveOne(args.input);
    }
  }
};
