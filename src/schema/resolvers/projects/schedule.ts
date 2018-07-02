import { IDataModelSet } from "../../../models";

export const resolvers = {
    Event: {
        async method(obj, args, context, info) {
            if(obj.method) {
                const models: IDataModelSet = context.models;
                return await models.MethodModel.findOne(obj.method);
            }
            return {};
        },
        async project(obj, args, context, info) {
            if(obj.project) {
                const models: IDataModelSet = context.models;
                return await models.ProjectModel.findOne(obj.project);
            }
            return {};
        },
        async animal(obj, args, context, info) {
            if(obj.animal) {
                const models: IDataModelSet = context.models;
                return await models.AnimalModel.findOne(obj.animal);
            }
            return {};
        },
        async user(obj, args, context, info) {
            if(obj.user) {
                const models: IDataModelSet = context.models;
                return await models.UserModel.findOne(obj.user);
            }
            return {};
        },
        async competencyLinks(obj, args, context, info) {
            if(obj.competencyLinks) {
                const models: IDataModelSet = context.models;
                return await models.CompetencyLinkModel.findMany(obj.competencyLinks);
            }
            return [];
        },
    },
};