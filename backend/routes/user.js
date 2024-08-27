import express from "express";
import { getMyProfile, logOut, login, register } from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/signUp", register);

router.post("/login", login);

router.get("/logout", logOut);

router.get("/me", isAuthenticated, getMyProfile);

export default router;
