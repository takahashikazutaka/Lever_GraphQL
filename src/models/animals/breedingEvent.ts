import { IConnectorModelSet } from "../../connectors";
import { Model, Types } from "mongoose";
import {
    IDataModelSet,
    IAnimalInput
} from "../../models";

export interface IBreedingEvent {
    _id: string,
    description?: string,
    mom?: string,
    dad?: string,
    pairFormingDate?: number,
    weanedDate?: number,
    litterSize?: number,
    offspring?: string[]
}

export interface IBreedingEventInput {
    description?: string,
    mom?: IAnimalInput,
    dad?: IAnimalInput,
    pairFormingDate?: number,
    weanedDate?: number,
    litterSize?: number,
    offspring?: IAnimalInput[]
}

export class BreedingEventModel {
    private model: Model<any>;
    private dataModels: IDataModelSet;

    constructor(connectorModels: IConnectorModelSet) {
        this.model = connectorModels.BreedingEventModel;
    }

    public init(dataModels: IDataModelSet) {
        this.dataModels = dataModels;
    }

    public findOne(id: string): Promise<IBreedingEvent> {
        return this.model.findOne({ _id: id }).exec();
    }

    public findMany(ids: string[]): Promise<IBreedingEvent>[] {
        return ids.map((id) => {
            return this.model.findOne({ _id: id }).exec();
        });
    }

    public findAll(): Promise<IBreedingEvent[]> {
        return this.model.find().exec();
    }

    public async saveOne(input: IBreedingEventInput): Promise<IBreedingEvent> {
        Object.assign(input, { _id: Types.ObjectId().toHexString() });
        if (input.mom) {
            const field = await this.dataModels.AnimalModel.saveOne(input.mom);
            Object.assign(input.mom, {
                mom: field._id
            });
        }
        if (input.dad) {
            const field = await this.dataModels.AnimalModel.saveOne(input.dad);
            Object.assign(input.dad, {
                dad: field._id
            });
        }
        if (input.offspring) {
            const field = this.dataModels.AnimalModel.saveMany(input.offspring);
            Object.assign(input.offspring, {
                offspring: field.map(async (item) => (await item)._id)
            });
        }

        return this.model.create(input);
    }

    public saveMany(input: IBreedingEventInput[]): Promise<IBreedingEvent>[] {
        return input.map((item) => this.saveOne(item));
    }

    public updateOne(input: IBreedingEventInput, id: string): Promise<IBreedingEvent> {
        Object.assign(input, { _id: id });
        return this.model.updateOne({ _id: id }, input).exec();
    }
}