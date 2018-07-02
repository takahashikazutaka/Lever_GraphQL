import { IDataModelSet } from "../../../../models";

export const resolvers = {
    Query: {
        // General get all queries
        async qCompetencyLinks(obj, args, context, info) {
            const models: IDataModelSet = context.models;
            return await models.CompetencyLinkModel.findAll();
        },
        async qCompetencies(obj, args, context, info) {
            const models: IDataModelSet = context.models;
            return await models.CompetencyModel.findAll();
        },
        async qEvents(obj, args, context, info) {
            const models: IDataModelSet = context.models;
            return await models.EventModel.findAll();
        },
        async qProjects(obj, args, context, info) {
            const models: IDataModelSet = context.models;
            return await models.ProjectModel.findAll();
        },
        async qUsers(obj, args, context, info) {
            const models: IDataModelSet = context.models;
            return await models.UserModel.findAll();
        },
    }
}