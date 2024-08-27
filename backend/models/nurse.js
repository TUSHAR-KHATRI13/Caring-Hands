import mongoose from "mongoose";

const schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  secondName: {
    type: String,
    required: true,
  },
  mobileNo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  licenseNo: {
    type: String,
    required: true,
    unique: true,
  },
  experience: {
    type: String,
    required: true,
  },
  unversity: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Nurse = mongoose.model("Nurse", schema);
