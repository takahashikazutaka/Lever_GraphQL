import { IDataModelSet } from "../../../../models";

export const resolvers = {
    Query: {
        async comps(obj, args, context, info) {
            const models: IDataModelSet = context.models;
            return await models.CompetencyModel.findOne(args.id);
        }
    }
}