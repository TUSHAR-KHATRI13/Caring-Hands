import express from "express";
import { Nregister, nurseDetails, getAllNurses, getNurseById } from "../controllers/nurse.js";
import { isAuthenticated } from "../middleware/auth.js";
import { logOut,  } from "../controllers/user.js";

const router = express.Router();

router.post("/signUp", isAuthenticated, Nregister);

router.get("/logout",logOut);

router.get("/me", isAuthenticated, nurseDetails);

router.get("/all", getAllNurses);

router.get("/:nurseId", getNurseById)
export default router;
