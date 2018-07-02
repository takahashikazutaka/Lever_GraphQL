import { IConnectorModelSet } from "../../connectors";
import { Model, Types } from "mongoose";
import {
    IDataModelSet,
    IPositionOneInput,
    IPositionTwoInput,
    IBolusInput
} from "../../models";

export interface IMethod {
    _id: string,
    name?: string,
    description?: string,
    date?: number,
    positionOne?: string[],
    positionTwo?: string[],
    bolus?: string
}

export interface IMethodInput {
    name?: string,
    description?: string,
    date?: number,
    positionOne?: IPositionOneInput[],
    positionTwo?: IPositionTwoInput[],
    bolus?: IBolusInput
}

export class MethodModel {
    private model: Model<any>;
    private dataModels: IDataModelSet;

    constructor(modelSet: IConnectorModelSet) {
        this.model = modelSet.MethodModel;
    }

    public init(dataModels: IDataModelSet) {
        this.dataModels = dataModels;
    }

    public findOne(id: string): Promise<IMethod> {
        return this.model.findOne({ _id: id }).exec();
    }

    public findMany(ids: string[]): Promise<IMethod>[] {
        return ids.map((id) => {
            return this.model.findOne({ _id: id }).exec();
        });
    }

    public findAll(): Promise<IMethod[]> {
        return this.model.find().exec();
    }

    public async saveOne(input: IMethodInput): Promise<IMethod> {
        Object.assign(input, { _id: Types.ObjectId().toHexString() });
        if (input.positionOne) {
            const field = this.dataModels.PositionOneModel.saveMany(input.positionOne);
            Object.assign(input.positionOne, {
                positionOne: field.map(async (item) => (await item)._id)
            });
        }
        if (input.positionTwo) {
            const field = this.dataModels.PositionTwoModel.saveMany(input.positionTwo);
            Object.assign(input.positionTwo, {
                positionTwo: field.map(async (item) => (await item)._id)
            });
        }
        if (input.bolus) {
            const field = await this.dataModels.BolusModel.saveOne(input.bolus);
            Object.assign(input.bolus, {
                bolus: field._id
            });
        }

        return this.model.create(input);
    }

    public saveMany(input: IMethodInput[]): Promise<IMethod>[] {
        return input.map((item) => this.saveOne(item));
    }

    public updateOne(input: IMethodInput, id: string): Promise<IMethod> {
        Object.assign(input, { _id: id });
        return this.model.updateOne({ _id: id }, input).exec();
    }
}