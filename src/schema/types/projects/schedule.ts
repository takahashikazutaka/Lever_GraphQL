import gql from "graphql-tag";

export const typeDefs = gql`
    type Event {
        _id: String!
        description: String
        method: Method!
        project: Project!
        animal: Animal!
        user: User
        addDate: Int
        dueDate: Int
        claimDate: Int
        completionDate: Int
        competencyLinks: [CompetencyLink]
        complete: Boolean
    }

    input EventInput {
        description: String
        project: ProjectInput
        user: UserInput
        addDate: Int
        dueDate: Int
        claimDate: Int
        completionDate: Int
        competencyLinks: [CompetencyLinkInput]
        complete: Boolean
    }
`