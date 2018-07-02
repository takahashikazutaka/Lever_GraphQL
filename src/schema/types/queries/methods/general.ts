import gql from "graphql-tag";

export const typeDefs = gql`
    extend type Query {
        # General get all queries
        qBolus: [Bolus]!
        qMethods: [Method]!
        qPositionOne: [PositionOne]!
        qPositionTwo: [PositionTwo]!
    }
`;