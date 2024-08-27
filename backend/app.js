import express from "express";
import userRouter from "./routes/user.js";
import nurseRouter from "./routes/nurse.js";
import chatbotRouter from "./routes/chatBot.js";
import bookingRouter from "./routes/booking.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errMiddleware } from "./middleware/error.js";
import cors from "cors";

const app = express();

config({
  path: "backend/data/.env",
});

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/backend/api/v1/booking", bookingRouter);
app.use("/backend/api/v1/users", userRouter);
app.use("/backend/api/v1/nurse", nurseRouter);
app.use("/chatbot", chatbotRouter);

app.use(errMiddleware);

export default app;
