import { Schema } from "mongoose";

export const schema = new Schema({
    _id: String,
    phenotype: String,
    date: Number
});