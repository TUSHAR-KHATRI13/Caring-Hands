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
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  nurseID: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

export const User = mongoose.model("User", schema);
