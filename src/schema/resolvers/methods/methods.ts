import { IDataModelSet } from "../../../models";

export const resolvers = {
    Method: {
        __resolveType(obj, args, context, info) {
            if(obj.positionOne) {
                return "Vfss";
            }
            return null;
        }
    }
}