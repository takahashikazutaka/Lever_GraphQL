import { IConnectorModelSet } from "../../connectors";
import { Model, Types } from "mongoose";
import {
    IDataModelSet,
    ICompetencyInput
} from "../../models";

export interface ICompetencyLink {
    _id: string,
    competency?: string,
    level?: number
}

export interface ICompetencyLinkInput {
    competency?: ICompetencyInput,
    level?: number
}

export class CompetencyLinkModel {
    private model: Model<any>;
    private dataModels: IDataModelSet;

    constructor(modelSet: IConnectorModelSet) {
        this.model = modelSet.CompetencyLinkModel;
    }

    public init(dataModels: IDataModelSet) {
        this.dataModels = dataModels;
    }

    public findOne(id: string): Promise<ICompetencyLink> {
        return this.model.findOne({ _id: id }).exec();
    }

    public findMany(ids: string[]): Promise<ICompetencyLink>[] {
        return ids.map((id) => {
            return this.model.findOne({ _id: id }).exec();
        });
    }

    public findAll(): Promise<ICompetencyLink[]> {
        return this.model.find().exec();
    }

    public async saveOne(input: ICompetencyLinkInput): Promise<ICompetencyLink> {
        Object.assign(input, { _id: Types.ObjectId().toHexString() });
        if (input.competency) {
            const field = await this.dataModels.CompetencyModel.saveOne(input.competency);
            Object.assign(input.competency, {
                competency: field._id
            });
        }

        return this.model.create(input);
    }

    public saveMany(input: ICompetencyLinkInput[]): Promise<ICompetencyLink>[] {
        return input.map((item) => this.saveOne(item));
    }

    public updateOne(input: ICompetencyLinkInput, id: string): Promise<ICompetencyLink> {
        Object.assign(input, { _id: id });
        return this.model.updateOne({ _id: id }, input).exec();
    }
}