import gql from "graphql-tag";

export const typeDefs = gql`
  interface Animal {
    _id: String!
    species: Species!
    description: String
    genotype: Genotype
    phenotypeLinks: [PhenotypeLink]
    sex: Sex
    dob: Int
    dod: Int
    causeOfDeath: String
    measurements: [Measurement]
  }

  enum Species {
    MOUSE
  }

  type Mouse implements Animal {
    _id: String!
    species: Species!
    description: String
    genotype: Genotype
    phenotypeLinks: [PhenotypeLink]
    sex: Sex
    dob: Int
    dod: Int
    causeOfDeath: String
    measurements: [Measurement]
    cage: Int
    coat: CoatColor
    leftEarPunches: Int
    rightEarPunches: Int
  }

  input MouseInput {
    description: String
    genotype: GenotypeInput
    phenotypeLinks: [PhenotypeLinkInput]
    sex: Sex
    dob: Int
    dod: Int
    causeOfDeath: String
    cage: Int
    coat: CoatColor
    leftEarPunches: Int
    rightEarPunches: Int
  }

  type Measurement {
    _id: String!
    type: MeasurementType!
    value: Float!
  }

  input MeasurementInput {
    type: MeasurementTypeInput!
    value: Float!
  }

  type MeasurementType {
    _id: String!
    name: String
    description: String
    unit: String
  }

  input MeasurementTypeInput {
    name: String
    description: String
    unit: String
  }

  type BreedingEvent {
    _id: String!
    description: String
    mom: Animal
    dad: Animal
    pairFormingDate: Int
    weanedDate: Int
    litterSize: Int
    offspring: [Animal]!
  }

  input BreedingEventInput {
    description: String
    pairFormingDate: Int
    weanedDate: Int
    litterSize: Int
  }

  type Colony {
    _id: String!
    name: String!
    description: String
    animals: [Animal]!
  }

  input ColonyInput {
    name: String!
    description: String
  }

  type Genotype {
    _id: String!
    name: String
    description: String
  }

  input GenotypeInput {
    name: String
    description: String
  }

  type Phenotype {
    _id: String!
    name: String
    description: String
  }

  input PhenotypeInput {
    name: String
    description: String
  }

  type PhenotypeLink {
    _id: String!
    phenotype: Phenotype
    date: Int
  }

  input PhenotypeLinkInput {
    phenotype: PhenotypeInput
    date: Int
  }

  enum Sex {
    MALE
    FEMALE
  }

  enum CoatColor {
    WHITE
    BLACK
    BROWN
  }
`;
