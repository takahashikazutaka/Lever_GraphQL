import { IDataModelSet } from "../../../../models";

export const resolvers = {
    Query: {
        // General get all queries
        async qBolus(obj, args, context, info) {
            const models: IDataModelSet = context.models;
            return await models.BolusModel.findAll();
        },
        async qMethods(obj, args, context, info) {
            const models: IDataModelSet = context.models;
            return await models.MethodModel.findAll();
        },
        async qPositionOne(obj, args, context, info) {
            const models: IDataModelSet = context.models;
            return await models.PositionOneModel.findAll();
        },
        async qPositionTwo(obj, args, context, info) {
            const models: IDataModelSet = context.models;
            return await models.PositionTwoModel.findAll();
        },
    }
}