import { Schema } from "mongoose";

export const schema = new Schema({
    _id: String,
    trial: Number,
    reviewerType: Number,
    firstSwallowOnsetFrame: Number,
    pttEndFrame: Number,
    secondSwallowOnsetFrame: Number,
    jawCyclesPerSwallow: Number,
    twoSecFromSwallowOnsetFrame: Number,
    swallowsPerTwoSeconds: Number,
    lickOnsetFrame: Number,
    lickEndFrame: Number,
    lickRate: Number,
    methodRun: Number,
    videoPath: String
});