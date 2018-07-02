import gql from "graphql-tag";

export const typeDefs = gql`
  extend type Query {
    # General get all queries
    qAnimals(species: [Species]): [Animal]!
    qMeasurements: [Measurement]!
    qMeasurementTypes: [MeasurementType]!
    qBreedingEvents: [BreedingEvent]!
    qColonies: [Colony]!
    qGenotypes: [Genotype]!
    qPhenotypes: [Phenotype]!
    qPhenotypeLinks: [PhenotypeLink]!
  }
`;
