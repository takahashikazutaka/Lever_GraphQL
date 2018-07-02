import { Schema } from "mongoose";

export const schema = new Schema({
  _id: String,
  name: String,
  description: String,
  unit: String
});