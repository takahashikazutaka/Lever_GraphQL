import { IConnectorModelSet } from "../../connectors";
import { Model, Types } from "mongoose";
import {
    IDataModelSet,
    IUserInput
} from "../../models";

export interface IBolus {
    _id: string,
    trial?: number,
    onsetFrame?: number,
    timeGrabbedFrame?: number,
    methodRun?: number,
    reviewerOne?: string,
    reviewerTwo?: string
}

export interface IBolusInput {
    trial?: number,
    onsetFrame?: number,
    timeGrabbedFrame?: number,
    methodRun?: number,
    reviewerOne?: IUserInput,
    reviewerTwo?: IUserInput
}

export class BolusModel {
    private model: Model<any>;
    private dataModels: IDataModelSet;

    constructor(modelSet: IConnectorModelSet) {
        this.model = modelSet.BolusModel;
    }

    public init(dataModels: IDataModelSet) {
        this.dataModels = dataModels;
    }

    public findOne(id: string): Promise<IBolus> {
        return this.model.findOne({ _id: id }).exec();
    }

    public findMany(ids: string[]): Promise<IBolus>[] {
        return ids.map((id) => {
            return this.model.findOne({ _id: id }).exec();
        });
    }

    public findAll(): Promise<IBolus[]> {
        return this.model.find().exec();
    }

    public async saveOne(input: IBolusInput): Promise<IBolus> {
        Object.assign(input, { _id: Types.ObjectId().toHexString() });
        if (input.reviewerOne) {
            const field = await this.dataModels.UserModel.saveOne(input.reviewerOne);
            Object.assign(input.reviewerOne, {
                reviewerOne: field._id
            });
        }
        if (input.reviewerTwo) {
            const field = await this.dataModels.UserModel.saveOne(input.reviewerTwo);
            Object.assign(input.reviewerTwo, {
                reviewerTwo: field._id
            });
        }

        return this.model.create(input);
    }

    public saveMany(input: IBolusInput[]): Promise<IBolus>[] {
        return input.map((item) => this.saveOne(item));
    }

    public updateOne(input: IBolusInput, id: string): Promise<IBolus> {
        Object.assign(input, { _id: id });
        return this.model.updateOne({ _id: id }, input).exec();
    }
}