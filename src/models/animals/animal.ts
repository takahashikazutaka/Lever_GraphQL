import { IConnectorModelSet } from "../../connectors";
import { Model, Types } from "mongoose";
import {
  IDataModelSet,
  IGenotypeInput,
  IPhenotypeLinkInput,
  IMeasurementInput
} from "../../models";

export interface IAnimal {
  _id: string;
  species: string;
  description?: string;
  genotype?: string;
  phenotypeLinks?: string[];
  sex?: number;
  dob?: number;
  dod?: number;
  causeOfDeath?: string;
  measurements?: string[];
  cage?: number;
  coat?: string;
  leftEarPunches?: number;
  rightEarPunches?: number;
}

export interface IAnimalInput {
  description?: string;
  species: string;
  genotype?: IGenotypeInput;
  phenotypeLinks?: IPhenotypeLinkInput[];
  sex?: number;
  dob?: number;
  dod?: number;
  causeOfDeath?: string;
  measurements?: IMeasurementInput[];
  cage?: number;
  coat?: string;
  leftEarPunches?: number;
  rightEarPunches?: number;
}

export class AnimalModel {
  private model: Model<any>;
  private dataModels: IDataModelSet;

  constructor(connectorModels: IConnectorModelSet) {
    this.model = connectorModels.AnimalModel;
  }

  public init(dataModels: IDataModelSet) {
    this.dataModels = dataModels;
  }

  public findOne(id: string): Promise<IAnimal> {
    return this.model.findOne({ _id: id }).exec();
  }

  public findMany(ids: string[]): Promise<IAnimal>[] {
    if (ids.length == 0) {
      return [];
    }
    return ids.map(id => {
      return this.model.findOne({ _id: id }).exec();
    });
  }

  public async findAll(species: string[]): Promise<IAnimal[]> {
    if (species.length === 0) {
      return this.model.find().exec();
    }

    const animals: IAnimal[] = [];
    species.map(async s => {
      const a = await this.findBySpecies(s);
      animals.push(...a);
    });

    return Promise.resolve(animals);
  }

  public async saveOne(input: IAnimalInput): Promise<IAnimal> {
    Object.assign(input, { _id: Types.ObjectId().toHexString() });
    if (input.genotype) {
      const field = await this.dataModels.GenotypeModel.saveOne(input.genotype);
      Object.assign(input.genotype, {
        genotype: field._id
      });
    }
    if (input.phenotypeLinks) {
      const field = this.dataModels.PhenotypeLinkModel.saveMany(
        input.phenotypeLinks
      );
      Object.assign(input.phenotypeLinks, {
        phenotypeLinks: field.map(async item => (await item)._id)
      });
    }
    if (input.measurements) {
      const field = this.dataModels.MeasurementModel.saveMany(
        input.measurements
      );
      Object.assign(input.measurements, {
        measurements: field.map(async item => (await item)._id)
      });
    }

    return this.model.create(input);
  }

  public saveMany(input: IAnimalInput[]): Promise<IAnimal>[] {
    return input.map(item => this.saveOne(item));
  }

  public updateOne(input: IAnimalInput, id: string): Promise<IAnimal> {
    Object.assign(input, { _id: id });
    return this.model.updateOne({ _id: id }, input).exec();
  }

  public findBySpecies(species: string): Promise<IAnimal[]> {
    return this.model.find({ species: species }).exec();
  }

  // public async setGenotype(id: string, genotypeId: string): Promise<IAnimal> {
  //     const animal = await this.findOne(id);
  //     const genotype = await this.dataModels.GenotypeModel.findOne(genotypeId);
  //     if(animal && genotype) {
  //         animal.genotype = genotype._id;
  //         return this.model.updateOne({ _id: id }, animal).exec();
  //     }
  //     return Promise.resolve(undefined);
  // }

  // public async addPhenotypeLink(id: string, phenotypeLinkId: string): Promise<IAnimal> {
  //     const animal = await this.findOne(id);

  // }
}
