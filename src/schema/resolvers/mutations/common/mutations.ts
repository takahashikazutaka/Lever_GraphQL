import { IDataModelSet } from "../../../../models";

export const resolvers = {
    Mutation: {
        async mCompetencyLink(obj, args, context, info) {
            const models: IDataModelSet = context.models;
            console.log(args.input);
            return await models.CompetencyLinkModel.saveOne(args.input);
        }
    }
}