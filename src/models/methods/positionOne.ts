import { IConnectorModelSet } from "../../connectors";
import { Model, Types } from "mongoose";
import { IDataModelSet } from "../models";

export interface IPositionOne {
    _id: string,
    trial?: number,
    reviewerType?: number,
    firstSwallowOnsetFrame?: number,
    pttEndFrame?: number,
    secondSwallowOnsetFrame?: number,
    jawCyclesPerSwallow?: number,
    twoSecFromSwallowOnsetFrame?: number,
    swallowsPerTwoSeconds?: number,
    lickOnsetFrame?: number,
    lickEndFrame?: number,
    lickRate?: number,
    methodRun?: number,
    videoPath?: string
}

export interface IPositionOneInput {
    _id: string,
    trial?: number,
    reviewerType?: number,
    firstSwallowOnsetFrame?: number,
    pttEndFrame?: number,
    secondSwallowOnsetFrame?: number,
    jawCyclesPerSwallow?: number,
    twoSecFromSwallowOnsetFrame?: number,
    swallowsPerTwoSeconds?: number,
    lickOnsetFrame?: number,
    lickEndFrame?: number,
    lickRate?: number,
    methodRun?: number,
    videoPath?: string
}

export class PositionOneModel {
    private model: Model<any>;
    private dataModels: IDataModelSet;

    constructor(modelSet: IConnectorModelSet) {
        this.model = modelSet.PositionOneModel;
    }

    public init(dataModels: IDataModelSet) {
        this.dataModels = dataModels;
    }

    public findOne(id: string): Promise<IPositionOne> {
        return this.model.findOne({ _id: id }).exec();
    }

    public findMany(ids: string[]): Promise<IPositionOne>[] {
        return ids.map((id) => {
            return this.model.findOne({ _id: id }).exec();
        });
    }

    public findAll(): Promise<IPositionOne[]> {
        return this.model.find().exec();
    }

    public async saveOne(input: IPositionOneInput): Promise<IPositionOne> {
        Object.assign(input, { _id: Types.ObjectId().toHexString() });
        return this.model.create(input);
    }

    public saveMany(input: IPositionOneInput[]): Promise<IPositionOne>[] {
        return input.map((item) => this.saveOne(item));
    }

    public updateOne(input: IPositionOneInput, id: string): Promise<IPositionOne> {
        Object.assign(input, { _id: id });
        return this.model.updateOne({ _id: id }, input).exec();
    }
}