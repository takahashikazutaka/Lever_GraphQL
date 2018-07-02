import { IConnectorModelSet } from "../../connectors";
import { Model, Types } from "mongoose";
import { IDataModelSet } from "../models";

export interface IGenotype {
    _id: string,
    name?: string,
    description?: string
}

export interface IGenotypeInput {
    name?: string,
    description?: string
}

export class GenotypeModel {
    private model: Model<any>;
    private dataModels: IDataModelSet;

    constructor(modelSet: IConnectorModelSet) {
        this.model = modelSet.GenotypeModel;
    }

    public init(dataModels: IDataModelSet) {
        this.dataModels = dataModels;
    }

    public findOne(id: string): Promise<IGenotype> {
        return this.model.findOne({ _id: id }).exec();
    }

    public findMany(ids: string[]): Promise<IGenotype>[] {
        return ids.map((id) => {
            return this.model.findOne({ _id: id }).exec();
        });
    }

    public findAll(): Promise<IGenotype[]> {
        return this.model.find().exec();
    }

    public async saveOne(input: IGenotypeInput): Promise<IGenotype> {
        Object.assign(input, { _id: Types.ObjectId().toHexString() });

        return this.model.create(input);
    }

    public saveMany(input: IGenotypeInput[]): Promise<IGenotype>[] {
        return input.map((item) => this.saveOne(item));
    }

    public updateOne(input: IGenotypeInput, id: string): Promise<IGenotype> {
        Object.assign(input, { _id: id });
        return this.model.updateOne({ _id: id }, input).exec();
    }
}