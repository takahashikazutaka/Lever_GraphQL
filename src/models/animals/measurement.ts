import { IConnectorModelSet } from "../../connectors";
import { Model, Types } from "mongoose";
import {
  IDataModelSet,
  IMeasurementTypeInput
} from "../../models";

export interface IMeasurement {
  _id: string,
  type?: string,
  value?: number
}

export interface IMeasurementInput {
  type?: IMeasurementTypeInput,
  value?: number
}

export class MeasurementModel {
  private model: Model<any>;
  private dataModels: IDataModelSet;

  constructor(connectorModels: IConnectorModelSet) {
    this.model = connectorModels.AnimalModel;
  }

  public init(dataModels: IDataModelSet) {
    this.dataModels = dataModels;
  }

  public findOne(id: string): Promise<IMeasurement> {
    return this.model.findOne({ _id: id }).exec();
  }

  public findMany(ids: string[]): Promise<IMeasurement>[] {
    if (ids.length == 0) {
      return [];
    }
    return ids.map((id) => {
      return this.model.findOne({ _id: id }).exec();
    });
  }

  public findAll(): Promise<IMeasurement[]> {
    return this.model.find().exec();
  }

  public async saveOne(input: IMeasurementInput): Promise<IMeasurement> {
    Object.assign(input, { _id: Types.ObjectId().toHexString() });
    if (input.type) {
      const field = await this.dataModels.MeasurementTypeModel.saveOne(input.type);
      Object.assign(input.type, {
        type: field._id
      });
    }

    return this.model.create(input);
  }

  public saveMany(input: IMeasurementInput[]): Promise<IMeasurement>[] {
    return input.map((item) => this.saveOne(item));
  }

  public updateOne(input: IMeasurementInput, id: string): Promise<IMeasurement> {
    Object.assign(input, { _id: id });
    return this.model.updateOne({ _id: id }, input).exec();
  }
}