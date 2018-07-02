import { Schema } from "mongoose";

export const schema = new Schema({
    _id: String,
    competency: String,
    level: Number
});