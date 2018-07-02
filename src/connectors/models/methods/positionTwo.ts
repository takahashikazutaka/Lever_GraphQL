import { Schema } from "mongoose";

export const schema = new Schema({
    _id: String,
    trial: Number,
    reviewerType: Number,
    firstSwallowOnsetFrame: Number,
    pttEndFrame: Number,
    ettEndFrame: Number,
    secondSwallowOnsetFrame: Number,
    esophagusEmptiesPriorToSecondSwallow: Number,
    numberOfSwallowsToClearEsophagus: Number,
    swallowInhibition: Boolean,
    methodRun: Number
});