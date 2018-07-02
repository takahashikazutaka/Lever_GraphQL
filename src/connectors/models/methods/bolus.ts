import { Schema } from "mongoose";

export const schema = new Schema({
    _id: String,
    trial: Number,
    onsetFrame: Number,
    timeGrabbedFrame: Number,
    methodRun: Number,
    reviewerOne: String,
    reviewerTwo: String
});