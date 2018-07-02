import gql from "graphql-tag";

export const typeDefs = gql`
    type Vfss implements Method {
        _id: String!
        name: String!
        description: String
        date: Int
        positionOne: [PositionOne]!
        positionTwo: [PositionTwo]!
        bolus: Bolus!
    }

    input VfssInput {
        name: String
        description: String
        date: Int
        positionOne: [PositionOneInput]
        positionTwo: [PositionTwoInput]
        bolus: BolusInput
    }

    type PositionOne {
        _id: String!
        trial: Int
        reviewerType: ReviewerType
        firstSwallowOnsetFrame: Int
        pttEndFrame: Int
        secondSwallowOnsetFrame: Int
        jawCyclesPerSwallow: Int
        twoSecFromSwallowOnsetFrame: Int
        swallowsPerTwoSeconds: Int
        lickOnsetFrame: Int
        lickEndFrame: Int
        lickRate: Int
        methodRun: Int
        videoPath: String!
    }

    input PositionOneInput {
        trial: Int
        reviewerType: ReviewerType
        firstSwallowOnsetFrame: Int
        pttEndFrame: Int
        secondSwallowOnsetFrame: Int
        jawCyclesPerSwallow: Int
        twoSecFromSwallowOnsetFrame: Int
        swallowsPerTwoSeconds: Int
        lickOnsetFrame: Int
        lickEndFrame: Int
        lickRate: Int
        methodRun: Int
        videoPath: String
    }

    type PositionTwo {
        _id: String!
        trial: Int
        reviewerType: ReviewerType
        firstSwallowOnsetFrame: Int
        pttEndFrame: Int
        ettEndFrame: Int
        secondSwallowOnsetFrame: Int
        esophagusEmptiesPriorToSecondSwallow: Int
        numberOfSwallowsToClearEsophagus: Int
        swallowInhibition: Boolean
        methodRun: Int
    }

    input PositionTwoInput {
        trial: Int
        reviewerType: ReviewerType
        firstSwallowOnsetFrame: Int
        pttEndFrame: Int
        ettEndFrame: Int
        secondSwallowOnsetFrame: Int
        esophagusEmptiesPriorToSecondSwallow: Int
        numberOfSwallowsToClearEsophagus: Int
        swallowInhibition: Boolean
        methodRun: Int
    }

    type Bolus {
        _id: String!
        trial: Int
        onsetFrame: Int
        timeGrabbedFrame: Int
        methodRun: Int
        reviewerOne: User
        reviewerTwo: User
    }

    input BolusInput {
        trial: Int
        onsetFrame: Int
        timeGrabbedFrame: Int
        methodRun: Int
        reviewerOne: UserInput
        reviewerTwo: UserInput
    }
`