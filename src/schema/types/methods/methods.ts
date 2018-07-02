import gql from "graphql-tag";

export const typeDefs = gql`
    interface Method {
        _id: String!
        name: String!
        description: String
        date: Int
    }

    enum ReviewerType {
        R1
        R2
        CONSENSUS
    }
`