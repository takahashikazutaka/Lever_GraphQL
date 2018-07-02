import gql from "graphql-tag";

export const typeDefs = gql`
    extend type Query {
        # General get all queries
        qCompetencies: [Competency]!
        qCompetencyLinks: [CompetencyLink]!
        qEvents: [Event]!
        qProjects: [Project]!
        qUsers: [User]!
    }
`;