import { Nurse } from "../models/nurse.js";
import { User } from "../models/user.js";
import { sendCookie } from "../utils/features.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "../middleware/error.js";

export const Nregister = async (req, res, next) => {
  try {
    console.log(req.user);
    const { licenseNo, experience, unversity, price } = req.body;
    const { firstName, secondName, mobileNo, email } = req.user;

    let nurse = await Nurse.findOne({ email });

    if (nurse) return next(new ErrorHandler("Nurse already exit", 400));

    nurse = await Nurse.create({
      firstName,
      secondName,
      mobileNo,
      email,
      licenseNo,
      experience,
      unversity,
      price,
    });

    const userId = nurse._id.toString();
    console.log(userId);
    await User.updateOne({ email }, { nurseID: userId });

    sendCookie(nurse, res, "Registered Successfully as Nurse", 201);
  } catch (error) {
    next(error);
  }
};

export const nurseDetails = async (req, res) => {
  const { _id } = req.user;
  console.log(req.user);
  console.log(_id);
  const nurse = await Nurse.findById(_id);
  res.json({
    success: true,
    nurse,
  });
};

export const getAllNurses = async (req, res, next) => {
  const nurses = await Nurse.find();
  res.status(200).json({
    success: true,
    nurses,
  })
}

export const getNurseById = async (req, res) => {
  const { nurseId } = req.params;
  const nurse = await Nurse.findById(nurseId);
  res.json({
    success: true,
    nurse,
  });
};
