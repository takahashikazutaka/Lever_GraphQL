import { Schema } from "mongoose";

export const schema = new Schema({
    _id: String,
    description: String,
    mom: String,
    dad: String,
    pairFormingDate: Number,
    weanedDate: Number,
    litterSize: Number,
    offspring: Array<String>()
});