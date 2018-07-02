import gql from "graphql-tag";

export const typeDefs = gql`
  extend type Mutation {
    # General create one mutations
    mMouse(input: MouseInput!): Mouse
    mMeasurement(input: MeasurementInput!): Measurement
    mMeasurementType(input: MeasurementTypeInput!): MeasurementType
    mBreedingEvent(input: BreedingEventInput!): BreedingEvent
    mColony(input: ColonyInput!): Colony
    mPhenotype(input: PhenotypeInput!): Phenotype
    mPhenotypeLink(input: PhenotypeLinkInput!): PhenotypeLink
  }
`;
