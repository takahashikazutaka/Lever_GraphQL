import { IConnectorModelSet } from "../../connectors";
import { Model, Types } from "mongoose";
import { IDataModelSet } from "../models";

export interface IPhenotype {
    _id: string,
    name?: string,
    description?: string
}

export interface IPhenotypeInput {
    name?: string,
    description?: string
}

export class PhenotypeModel {
    private model: Model<any>;
    private dataModels: IDataModelSet;

    constructor(modelSet: IConnectorModelSet) {
        this.model = modelSet.PhenotypeModel;
    }

    public init(dataModels: IDataModelSet) {
        this.dataModels = dataModels;
    }

    public findOne(id: string): Promise<IPhenotype> {
        return this.model.findOne({ _id: id }).exec();
    }

    public findMany(ids: string[]): Promise<IPhenotype>[] {
        return ids.map((id) => {
            return this.model.findOne({ _id: id }).exec();
        });
    }

    public findAll(): Promise<IPhenotype[]> {
        return this.model.find().exec();
    }

    public async saveOne(input: IPhenotypeInput) {
        Object.assign(input, { _id: Types.ObjectId().toHexString() });

        return this.model.create(input);
    }

    public saveMany(input: IPhenotypeInput[]) {
        return input.map((item) => this.saveOne(item));
    }

    public updateOne(input: IPhenotypeInput, id: string) {
        Object.assign(input, { _id: id });
        return this.model.updateOne({ _id: id }, input);
    }
}