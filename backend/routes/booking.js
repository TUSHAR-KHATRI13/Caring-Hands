import express from "express";
import { bookingAppointment } from "../controllers/booking.js";
import { isAuthenticated } from "../middleware/auth.js";

const bookingRouter = express.Router();

bookingRouter.post("/new/:nurseId", isAuthenticated, bookingAppointment);

export default bookingRouter;
