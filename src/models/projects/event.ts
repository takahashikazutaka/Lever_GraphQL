import { IConnectorModelSet } from "../../connectors";
import { Model, Types } from "mongoose";
import {
    IDataModelSet,
    IMethodInput,
    IProjectInput,
    IAnimalInput,
    IUserInput,
    ICompetencyLinkInput
} from "../../models";

export interface IEvent {
    _id: string,
    description?: string,
    method?: string,
    project?: string,
    animal?: string,
    user?: string,
    addDate?: number,
    dueDate?: number,
    claimDate?: number,
    completionDate?: number,
    competencyLinks?: string[]
}

export interface IEventInput {
    description?: string,
    method?: IMethodInput,
    project?: IProjectInput,
    animal?: IAnimalInput,
    user?: IUserInput,
    addDate?: number,
    dueDate?: number,
    claimDate?: number,
    completionDate?: number,
    competencyLinks?: ICompetencyLinkInput[]
}

export class EventModel {
    private model: Model<any>;
    private dataModels: IDataModelSet;

    constructor(modelSet: IConnectorModelSet) {
        this.model = modelSet.EventModel;
    }

    public init(dataModels: IDataModelSet) {
        this.dataModels = dataModels;
    }

    public findOne(id: string): Promise<IEvent> {
        return this.model.findOne({ _id: id }).exec();
    }

    public findMany(ids: string[]): Promise<IEvent>[] {
        return ids.map((id) => {
            return this.model.findOne({ _id: id }).exec();
        });
    }

    public findAll(): Promise<IEvent[]> {
        return this.model.find().exec();
    }

    public async saveOne(input: IEventInput): Promise<IEvent> {
        Object.assign(input, { _id: Types.ObjectId().toHexString() });
        if (input.method) {
            const field = await this.dataModels.MethodModel.saveOne(input.method);
            Object.assign(input.method, {
                method: field._id
            });
        }
        if (input.project) {
            const field = await this.dataModels.ProjectModel.saveOne(input.project);
            Object.assign(input.project, {
                project: field._id
            });
        }
        if (input.animal) {
            const field = await this.dataModels.AnimalModel.saveOne(input.animal);
            Object.assign(input.animal, {
                animal: field._id
            });
        }
        if (input.user) {
            const field = await this.dataModels.UserModel.saveOne(input.user);
            Object.assign(input.user, {
                user: field._id
            });
        }
        if (input.competencyLinks) {
            const field = this.dataModels.CompetencyLinkModel.saveMany(input.competencyLinks);
            Object.assign(input.competencyLinks, {
                competencyLinks: field.map(async (item) => (await item)._id)
            });
        }

        return this.model.create(input);
    }

    public saveMany(input: IEventInput[]): Promise<IEvent>[] {
        return input.map((item) => this.saveOne(item));
    }

    public updateOne(input: IEventInput, id: string): Promise<IEvent> {
        Object.assign(input, { _id: id });
        return this.model.updateOne({ _id: id }, input).exec();
    }
}