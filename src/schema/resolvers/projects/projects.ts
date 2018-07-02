import { IDataModelSet } from "../../../models";

export const resolvers = {
    User: {
        async competencyLinks(obj, args, context, info) {
            if(obj.competencyLinks) {
                const models: IDataModelSet = context.models;
                return await models.CompetencyLinkModel.findMany(obj.competencyLinks);
            }
            return [];
        }
    },
    CompetencyLink: {
        async competency(obj, args, context, info) {
            if(obj.competency) {
                const models: IDataModelSet = context.models;
                return await models.CompetencyModel.findOne(obj.competency);
            }
            return null;
        }
    },
    Project: {
        async colonies(obj, args, context, info) {
            if(obj.colonies) {
                const models: IDataModelSet = context.models;
                return await models.ColonyModel.findMany(obj.colonies);
            }
            return [];
        },
        async animals(obj, args, context, info) {
            if(obj.animals) {
                const models: IDataModelSet = context.models;
                return await models.AnimalModel.findMany(obj.animals);
            }
            return [];
        },
        async users(obj, args, context, info) {
            if(obj.users) {
                const models: IDataModelSet = context.models;
                return await models.UserModel.findMany(obj.users);
            }
            return [];
        }
    }
};