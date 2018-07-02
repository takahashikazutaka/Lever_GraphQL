import { IConnectorModelSet } from "../../connectors";
import { Model, Types } from "mongoose";
import {
    IDataModelSet,
    IPhenotypeInput
} from "../../models";

export interface IPhenotypeLink {
    _id: string,
    phenotype?: string,
    date?: number
}

export interface IPhenotypeLinkInput {
    phenotype?: IPhenotypeInput,
    date?: number
}

export class PhenotypeLinkModel {
    private model: Model<any>;
    private dataModels: IDataModelSet;

    constructor(modelSet: IConnectorModelSet) {
        this.model = modelSet.PhenotypeLinkModel;
    }

    public init(dataModels: IDataModelSet) {
        this.dataModels = dataModels;
    }

    public findOne(id: string): Promise<IPhenotypeLink> {
        return this.model.findOne({ _id: id }).exec();
    }

    public findMany(ids: string[]): Promise<IPhenotypeLink>[] {
        return ids.map((id) => {
            return this.model.findOne({ _id: id }).exec();
        });
    }

    public findAll(): Promise<IPhenotypeLink[]> {
        return this.model.find().exec();
    }

    public async saveOne(input: IPhenotypeLinkInput): Promise<IPhenotypeLink> {
        Object.assign(input, { _id: Types.ObjectId().toHexString() });
        if (input.phenotype) {
            const field = await this.dataModels.PhenotypeModel.saveOne(input.phenotype);
            Object.assign(input.phenotype, {
                phenotype: field._id
            });
        }

        return this.model.create(input);
    }

    public saveMany(input: IPhenotypeLinkInput[]): Promise<IPhenotypeLink>[] {
        return input.map((item) => this.saveOne(item));
    }

    public updateOne(input: IPhenotypeLinkInput, id: string): Promise<IPhenotypeLink> {
        Object.assign(input, { _id: id });
        return this.model.updateOne({ _id: id }, input).exec();
    }
}