import { IConnectorModelSet } from "../../connectors";
import { Model, Types } from "mongoose";
import {
  IDataModelSet
} from "../../models";

export interface IMeasurementType {
  _id: string,
  name?: string,
  description?: string,
  unit?: string
}

export interface IMeasurementTypeInput {
  name?: string,
  description?: string,
  unit?: string
}

export class MeasurementTypeModel {
  private model: Model<any>;
  private dataModels: IDataModelSet;

  constructor(connectorModels: IConnectorModelSet) {
    this.model = connectorModels.AnimalModel;
  }

  public init(dataModels: IDataModelSet) {
    this.dataModels = dataModels;
  }

  public findOne(id: string): Promise<IMeasurementType> {
    return this.model.findOne({ _id: id }).exec();
  }

  public findMany(ids: string[]): Promise<IMeasurementType>[] {
    if (ids.length == 0) {
      return [];
    }
    return ids.map((id) => {
      return this.model.findOne({ _id: id }).exec();
    });
  }

  public findAll(): Promise<IMeasurementType[]> {
    return this.model.find().exec();
  }

  public async saveOne(input: IMeasurementTypeInput): Promise<IMeasurementType> {
    Object.assign(input, { _id: Types.ObjectId().toHexString() });

    return this.model.create(input);
  }

  public saveMany(input: IMeasurementTypeInput[]): Promise<IMeasurementType>[] {
    return input.map((item) => this.saveOne(item));
  }

  public updateOne(input: IMeasurementTypeInput, id: string): Promise<IMeasurementType> {
    Object.assign(input, { _id: id });
    return this.model.updateOne({ _id: id }, input).exec();
  }
}