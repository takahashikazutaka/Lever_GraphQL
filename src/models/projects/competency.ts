import { IConnectorModelSet } from "../../connectors";
import { Model, Types } from "mongoose";
import { IDataModelSet } from "../models";

export interface ICompetency {
    _id: string,
    name?: string,
    description?: string
}

export interface ICompetencyInput {
    name?: string;
    description?: string;
}

export class CompetencyModel {
    private model: Model<any>;
    private dataModels: IDataModelSet;

    constructor(modelSet: IConnectorModelSet) {
        this.model = modelSet.CompetencyModel;
    }

    public init(dataModels: IDataModelSet) {
        this.dataModels = dataModels;
    }

    public findOne(id: string): Promise<ICompetency> {
        return this.model.findOne({ _id: id }).exec();
    }

    public findMany(ids: string[]): Promise<ICompetency>[] {
        return ids.map((id) => {
            return this.model.findOne({ _id: id }).exec();
        });
    }

    public findAll(): Promise<ICompetency[]> {
        return this.model.find().exec();
    }

    public async saveOne(input: ICompetencyInput): Promise<ICompetency> {
        Object.assign(input, { _id: Types.ObjectId().toHexString() });
        return this.model.create(input);
    }

    public saveMany(input: ICompetencyInput[]): Promise<ICompetency>[] {
        return input.map((item) => this.saveOne(item));
    }

    public updateOne(input: ICompetencyInput, id: string): Promise<ICompetency> {
        Object.assign(input, { _id: id });
        return this.model.updateOne({ _id: id }, input).exec();
    }
}