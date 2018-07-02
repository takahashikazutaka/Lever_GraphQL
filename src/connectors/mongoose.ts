import { Mongoose, Model } from "mongoose";
import * as models from "./models";

export interface IConnectorModelSet {
  // from animals
  AnimalModel: Model<any>;
  BreedingEventModel: Model<any>;
  ColonyModel: Model<any>;
  GenotypeModel: Model<any>;
  MeasurementModel: Model<any>;
  MeasurementTypeModel: Model<any>;
  PhenotypeModel: Model<any>;
  PhenotypeLinkModel: Model<any>;

  // from methods
  BolusModel: Model<any>;
  MethodModel: Model<any>;
  PositionOneModel: Model<any>;
  PositionTwoModel: Model<any>;

  // from projects
  CompetencyModel: Model<any>;
  CompetencyLinkModel: Model<any>;
  EventModel: Model<any>;
  ProjectModel: Model<any>;
  UserModel: Model<any>;
}

export function createConnectorModels(): IConnectorModelSet {
  const mongoose = new Mongoose();
  //Set up default mongoose connection
  const mongoDB = "mongodb://127.0.0.1/leverdb";
  mongoose.connect(mongoDB);
  // Get Mongoose to use the global promise library
  mongoose.Promise = global.Promise;
  //Get the default connection
  const db = mongoose.connection;

  //Bind connection to error event (to get notification of connection errors)
  db.on("error", console.error.bind(console, "MongoDB connection error:"));

  return {
    // from animals
    AnimalModel: mongoose.model("AnimalModel", models.animals.animal),
    BreedingEventModel: mongoose.model(
      "BreedingEventModel",
      models.animals.breedingEvent
    ),
    ColonyModel: mongoose.model("ColonyModel", models.animals.colony),
    GenotypeModel: mongoose.model("GenotypeModel", models.animals.genotype),
    MeasurementTypeModel: mongoose.model(
      "MeasurementTypeModel",
      models.animals.measurementType
    ),
    MeasurementModel: mongoose.model(
      "MeasurementModel",
      models.animals.measurement
    ),
    PhenotypeModel: mongoose.model("PhenotypeModel", models.animals.phenotype),
    PhenotypeLinkModel: mongoose.model(
      "PhenotypeLinkModel",
      models.animals.phenotypeLink
    ),

    // from methods
    BolusModel: mongoose.model("BolusModel", models.methods.bolus),
    MethodModel: mongoose.model("MethodModel", models.methods.method),
    PositionOneModel: mongoose.model(
      "PositionOneModel",
      models.methods.positionOne
    ),
    PositionTwoModel: mongoose.model(
      "PositionTwoModel",
      models.methods.positionTwo
    ),

    // from projects
    CompetencyModel: mongoose.model(
      "CompetencyModel",
      models.projects.competency
    ),
    CompetencyLinkModel: mongoose.model(
      "CompetencyLinkModel",
      models.projects.competencyLink
    ),
    EventModel: mongoose.model("EventModel", models.projects.event),
    ProjectModel: mongoose.model("ProjectModel", models.projects.project),
    UserModel: mongoose.model("UserModel", models.projects.user)
  };
}
