import { IDataModelSet } from "../../../models";

export const resolvers = {
    Vfss: {
        async positionOne(obj, args, context, info) {
            if(obj.positionOne) {
                const models: IDataModelSet = context.models;
                return await models.PositionOneModel.findMany(obj.positionOne);
            } 
            return [];
        },
        async positionTwo(obj, args, context, info) {
            if(obj.positionTwo) {
                const models: IDataModelSet = context.models;
                return await models.PositionTwoModel.findMany(obj.positionTwo);
            } 
            return [];
        },
        async bolus(obj, args, context, info) {
            if(obj.bolus) {
                const models: IDataModelSet = context.models;
                return await models.BolusModel.findOne(obj.bolus);
            } 
            return {};
        }
    },
    Bolus: {
        async reviewerOne(obj, args, context, info) {
            if(obj.reviewerOne) {
                const models: IDataModelSet = context.models;
                return await models.UserModel.findOne(obj.reviewerOne);
            } 
            return {};
        },
        async reviewerTwo(obj, args, context, info) {
            if(obj.reviewerOne) {
                const models: IDataModelSet = context.models;
                return await models.UserModel.findOne(obj.reviewerTwo);
            } 
            return {};
        }
    }
}