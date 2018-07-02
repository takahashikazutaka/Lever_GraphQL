import { createConnectorModels, IConnectorModelSet } from "../connectors";
import * as animals from "./animals";
import * as methods from "./methods";
import * as projects from "./projects";

export interface IDataModelSet {
    // from animals
    AnimalModel: animals.AnimalModel;
    BreedingEventModel: animals.BreedingEventModel;
    ColonyModel: animals.ColonyModel;
    GenotypeModel: animals.GenotypeModel;
    MeasurementModel: animals.MeasurementModel;
    MeasurementTypeModel: animals.MeasurementTypeModel
    PhenotypeModel: animals.PhenotypeModel;
    PhenotypeLinkModel: animals.PhenotypeLinkModel;

    // from methods
    BolusModel: methods.BolusModel;
    MethodModel: methods.MethodModel;
    PositionOneModel: methods.PositionOneModel;
    PositionTwoModel: methods.PositionTwoModel;

    // from projects
    CompetencyModel: projects.CompetencyModel;
    CompetencyLinkModel: projects.CompetencyLinkModel;
    EventModel: projects.EventModel;
    ProjectModel: projects.ProjectModel;
    UserModel: projects.UserModel;
}

export function createDataModels(): IDataModelSet {
    const connectorModelSet: IConnectorModelSet = createConnectorModels();

    return {
        // from animals
        AnimalModel: new animals.AnimalModel(connectorModelSet),
        BreedingEventModel: new animals.BreedingEventModel(connectorModelSet),
        ColonyModel: new animals.ColonyModel(connectorModelSet),
        GenotypeModel: new animals.GenotypeModel(connectorModelSet),
        MeasurementModel: new animals.MeasurementModel(connectorModelSet),
        MeasurementTypeModel: new animals.MeasurementTypeModel(connectorModelSet),
        PhenotypeModel: new animals.PhenotypeModel(connectorModelSet),
        PhenotypeLinkModel: new animals.PhenotypeLinkModel(connectorModelSet),

        // from methods
        BolusModel: new methods.BolusModel(connectorModelSet),
        MethodModel: new methods.MethodModel(connectorModelSet),
        PositionOneModel: new methods.PositionOneModel(connectorModelSet),
        PositionTwoModel: new methods.PositionTwoModel(connectorModelSet),

        // from projects
        CompetencyModel: new projects.CompetencyModel(connectorModelSet),
        CompetencyLinkModel: new projects.CompetencyLinkModel(connectorModelSet),
        EventModel: new projects.EventModel(connectorModelSet),
        ProjectModel: new projects.ProjectModel(connectorModelSet),
        UserModel: new projects.UserModel(connectorModelSet)
    }
}