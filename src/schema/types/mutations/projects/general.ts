import gql from "graphql-tag";

export const typeDefs = gql`
    extend type Mutation {
        # General create one mutations
        mCompetency(input: CompetencyInput!): Competency
        mCompetencyLink(input: CompetencyLinkInput!): CompetencyLink
        mEvent(input: EventInput!): Event
        mProject(input: ProjectInput!): Project
        mUser(input: UserInput!): User
    }
`;