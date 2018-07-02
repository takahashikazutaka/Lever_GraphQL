import gql from "graphql-tag";

export const typeDefs = gql`
    type Mutation {
        comps(id: String): Competency
    }
`