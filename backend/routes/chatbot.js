import express from "express";
import { chatbot } from "../controllers/chatbot.js";

const chatbotRouter = express.Router();

chatbotRouter.post("/CB", chatbot)

export default chatbotRouter;
