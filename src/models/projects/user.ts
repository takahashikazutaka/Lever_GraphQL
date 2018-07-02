import { IConnectorModelSet } from "../../connectors";
import { Model, Types } from "mongoose";
import {
    IDataModelSet,
    ICompetencyLinkInput
} from "../../models";

export interface IUser {
    _id: string,
    username?: string,
    password?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    phone?: string,
    privilege?: string,
    competencyLinks?: string[],
    picturePath?: string
}

export interface IUserInput {
    username?: string,
    password?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    phone?: string,
    privilege?: string,
    competencyLinks?: ICompetencyLinkInput[],
    picturePath?: string
}

export class UserModel {
    private model: Model<any>;
    private dataModels: IDataModelSet;

    constructor(modelSet: IConnectorModelSet) {
        this.model = modelSet.UserModel;
    }

    public init(dataModels: IDataModelSet) {
        this.dataModels = dataModels;
    }

    public findOne(id: string): Promise<IUser> {
        return this.model.findOne({ _id: id }).exec();
    }

    public findMany(ids: string[]): Promise<IUser>[] {
        return ids.map((id) => {
            return this.model.findOne({ _id: id }).exec();
        });
    }

    public findAll(): Promise<IUser[]> {
        return this.model.find().exec();
    }

    public async saveOne(input: IUserInput): Promise<IUser> {
        Object.assign(input, { _id: Types.ObjectId().toHexString() });
        if (input.competencyLinks) {
            const field = this.dataModels.CompetencyLinkModel.saveMany(input.competencyLinks);
            Object.assign(input.competencyLinks, {
                competencyLinks: field.map(async (item) => (await item)._id)
            });
        }

        return this.model.create(input);
    }

    public saveMany(input: IUserInput[]): Promise<IUser>[] {
        return input.map((item) => this.saveOne(item));
    }

    public updateOne(input: IUserInput, id: string): Promise<IUser> {
        Object.assign(input, { _id: id });
        return this.model.updateOne({ _id: id }, input).exec();
    }

    public async addCompetencyLink(userId: string, competencyLinkId: string): Promise<IUser> {
        const user: IUser = await this.findOne(userId);
        user.competencyLinks ? user.competencyLinks.push(competencyLinkId) : () => {
            user.competencyLinks = [];
            user.competencyLinks.push(competencyLinkId);
        };

        return this.model.updateOne({ _id: user._id }, user);
    }
}