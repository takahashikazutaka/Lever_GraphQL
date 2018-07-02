import { Schema } from "mongoose";

export const schema = new Schema({
  _id: String,
  species: String,
  description: String,
  genotype: String,
  phenotypeLinks: Array<String>(),
  sex: String,
  dob: Number,
  dod: Number,
  causeOfDeath: String,
  cage: Number,
  coat: String,
  leftEarPunches: Number,
  rightEarPunches: Number
});
