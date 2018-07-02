import { Schema } from "mongoose";

export const schema = new Schema({
    _id: String,
    description: String,
    method: String,
    project: String,
    animal: String,
    user: String,
    addDate: Number,
    dueDate: Number,
    claimDate: Number,
    completionDate: Number,
    competencyLinks: Array<String>()
});