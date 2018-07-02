import { Schema } from "mongoose";

export const schema = new Schema({
    _id: String,
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    privilege: String,
    competencyLinks: Array<String>(),
    picturePath: String
});