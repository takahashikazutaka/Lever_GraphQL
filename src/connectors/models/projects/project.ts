import { Schema } from "mongoose";

export const schema = new Schema({
    _id: String,
    name: String,
    description: String,
    startDate: Number,
    endDate: Number,
    colonies: Array<String>(),
    animals: Array<String>(),
    users: Array<String>()
});