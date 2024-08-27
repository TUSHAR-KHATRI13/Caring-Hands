import { Nurse } from "../models/nurse.js";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({
      success: false,
      message: "Login First",
    });
  }

  try {
    const decoded = jwt.verify(token, "bwvbw2elvei");
    req.user = await User.findById(decoded._id);
    if (!req.user) {
      req.user = await Nurse.findById(decoded._id);
    } 
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    // Handle the error or send an appropriate response
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};
