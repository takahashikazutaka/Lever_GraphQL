import { IConnectorModelSet } from "../../connectors";
import { Model, Types } from "mongoose";
import {
    IDataModelSet,
    IColonyInput,
    IAnimalInput,
    IUserInput
} from "../../models";

export interface IProject {
    _id: string,
    name?: string,
    description?: string,
    startDate?: number,
    endDate?: number,
    colonies?: string[],
    animals?: string[],
    users?: string[]
}

export interface IProjectInput {
    name?: string,
    description?: string,
    startDate?: number,
    endDate?: number,
    colonies?: [IColonyInput],
    animals?: [IAnimalInput],
    users?: [IUserInput]
}

export class ProjectModel {
    private model: Model<any>;
    private dataModels: IDataModelSet;

    constructor(modelSet: IConnectorModelSet) {
        this.model = modelSet.ProjectModel;
    }

    public init(dataModels: IDataModelSet) {
        this.dataModels = dataModels;
    }

    public findOne(id: string): Promise<IProject> {
        return this.model.findOne({ _id: id }).exec();
    }

    public findMany(ids: string[]): Promise<IProject>[] {
        return ids.map((id) => {
            return this.model.findOne({ _id: id }).exec();
        });
    }

    public findAll(): Promise<IProject[]> {
        return this.model.find().exec();
    }

    public async saveOne(input: IProjectInput): Promise<IProject> {
        Object.assign(input, { _id: Types.ObjectId().toHexString() });
        if (input.colonies) {
            const field = this.dataModels.ColonyModel.saveMany(input.colonies);
            Object.assign(input.colonies, {
                colonies: field.map(async (item) => (await item)._id)
            });
        }
        if (input.animals) {
            const field = this.dataModels.AnimalModel.saveMany(input.animals);
            Object.assign(input.animals, {
                animals: field.map(async (item) => (await item)._id)
            });
        }
        if (input.users) {
            const field = this.dataModels.UserModel.saveMany(input.users);
            Object.assign(input.users, {
                users: field.map(async (item) => (await item)._id)
            });
        }

        return this.model.create(input);
    }

    public saveMany(input: IProjectInput[]): Promise<IProject>[] {
        return input.map((item) => this.saveOne(item));
    }

    public updateOne(input: IProjectInput, id: string): Promise<IProject> {
        Object.assign(input, { _id: id });
        return this.model.updateOne({ _id: id }, input).exec();
    }
}