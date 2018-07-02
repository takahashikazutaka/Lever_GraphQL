import { Schema } from "mongoose";

export const schema = new Schema({
    _id: String,
    name: String,
    description: String,
    date: Number,
    positionOne: Array<String>(),
    positionTwo: Array<String>(),
    bolus: String
});