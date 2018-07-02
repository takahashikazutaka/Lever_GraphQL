import { IConnectorModelSet } from "../../connectors";
import { Model, Types } from "mongoose";
import {
    IDataModelSet,
    IAnimalInput
} from "../../models";

export interface IColony {
    _id: string,
    name?: string,
    description?: string,
    animals?: string[]
}

export interface IColonyInput {
    name?: string,
    description?: string,
    animals?: IAnimalInput[]
}

export class ColonyModel {
    private model: Model<any>;
    private dataModels: IDataModelSet;

    constructor(modelSet: IConnectorModelSet) {
        this.model = modelSet.ColonyModel;
    }

    public init(dataModels: IDataModelSet) {
        this.dataModels = dataModels;
    }

    public findOne(id: string): Promise<IColony> {
        return this.model.findOne({ _id: id }).exec();
    }

    public findMany(ids: string[]): Promise<IColony>[] {
        return ids.map((id) => {
            return this.model.findOne({ _id: id }).exec();
        });
    }

    public findAll(): Promise<IColony[]> {
        return this.model.find().exec();
    }

    public async saveOne(input: IColonyInput): Promise<IColony> {
        Object.assign(input, { _id: Types.ObjectId().toHexString() });
        if (input.animals) {
            const field = this.dataModels.AnimalModel.saveMany(input.animals);
            Object.assign(input.animals, {
                animals: field.map(async (item) => (await item)._id)
            });
        }

        return this.model.create(input);
    }

    public saveMany(input: IColonyInput[]): Promise<IColony>[] {
        return input.map((item) => this.saveOne(item));
    }

    public updateOne(input: IColonyInput, id: string): Promise<IColony> {
        Object.assign(input, { _id: id });
        return this.model.updateOne({ _id: id }, input).exec();
    }
}