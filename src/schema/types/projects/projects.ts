import gql from "graphql-tag";

export const typeDefs = gql`
    type User {
        _id: String!
        username: String!
        password: String!
        firstName: String!
        lastName: String!
        email: String!
        phone: String
        privilege: Privilege!
        competencyLinks: [CompetencyLink]!
        picturePath: String
    }

    input UserInput {
        username: String
        password: String
        firstName: String
        lastName: String
        email: String
        phone: String
        privilege: Privilege
        competencyLinks: [CompetencyLinkInput]
        picturePath: String
    }

    type CompetencyLink {
        _id: String!
        competency: Competency!
        level: Int!
    }

    input CompetencyLinkInput {
        competency: CompetencyInput
        level: Int
    }

    type Competency {
        _id: String!
        name: String!
        description: String
    }

    input CompetencyInput {
        name: String
        description: String
    }

    type Project {
        _id: String!
        name: String!
        description: String
        startDate: Int
        endDate: Int
        colonies: [Colony]!
        animals: [Animal]!
        users: [User]!
    }

    input ProjectInput {
        name: String
        description: String
        startDate: Int
        endDate: Int
        colonies: [ColonyInput]
        users: [UserInput]
    }

    enum Privilege {
        USER
        ADMIN
    }
`