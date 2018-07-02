import { IConnectorModelSet } from "../../connectors";
import { Model, Types } from "mongoose";
import { IDataModelSet } from "../models";

export interface IPositionTwo {
    _id: string,
    trial?: number,
    reviewerType?: number,
    firstSwallowOnsetFrame?: number,
    pttEndFrame?: number,
    ettEndFrame?: number,
    secondSwallowOnsetFrame?: number,
    esophagusEmptiesPriorToSecondSwallow?: number,
    numberOfSwallowsToClearEsophagus?: number,
    swallowInhibition?: boolean,
    methodRun?: number
}

export interface IPositionTwoInput {
    _id: string,
    trial?: number,
    reviewerType?: number,
    firstSwallowOnsetFrame?: number,
    pttEndFrame?: number,
    ettEndFrame?: number,
    secondSwallowOnsetFrame?: number,
    esophagusEmptiesPriorToSecondSwallow?: number,
    numberOfSwallowsToClearEsophagus?: number,
    swallowInhibition?: boolean,
    methodRun?: number
}

export class PositionTwoModel {
    private model: Model<any>;
    private dataModels: IDataModelSet

    constructor(modelSet: IConnectorModelSet) {
        this.model = modelSet.PositionTwoModel;
    }

    public init(dataModels: IDataModelSet) {
        this.dataModels = dataModels;
    }

    public findOne(id: string): Promise<IPositionTwo> {
        return this.model.findOne({ _id: id }).exec();
    }

    public findMany(ids: string[]): Promise<IPositionTwo>[] {
        return ids.map((id) => {
            return this.model.findOne({ _id: id }).exec();
        });
    }

    public findAll(): Promise<IPositionTwo[]> {
        return this.model.find().exec();
    }

    public async saveOne(input: IPositionTwoInput): Promise<IPositionTwo> {
        Object.assign(input, { _id: Types.ObjectId().toHexString() });
        return this.model.create(input);
    }

    public saveMany(input: IPositionTwoInput[]): Promise<IPositionTwo>[] {
        return input.map((item) => this.saveOne(item));
    }

    public updateOne(input: IPositionTwoInput, id: string): Promise<IPositionTwo> {
        Object.assign(input, { _id: id });
        return this.model.updateOne({ _id: id }, input).exec();
    }
}