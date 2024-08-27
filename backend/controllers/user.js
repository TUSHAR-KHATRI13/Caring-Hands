import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middleware/error.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("Invalid Email or password", 400));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new ErrorHandler("Invalid Email or password", 400));

    sendCookie(user, res, `welcome back ${user.firstName} `, 200);
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { firstName, secondName, mobileNo, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User already exit", 400));

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      firstName,
      secondName,
      mobileNo,
      email,
      password: hashedPassword,
    });

    sendCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
};

export const logOut = (req, res) => {
  res
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message: "Logout Successfully",
    });
};
