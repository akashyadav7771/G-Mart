import express from "express";
import { chatWithAI } from "../controllers/supportController.js";
import authUser from "../middlewares/authUser.js";

const supportRouter = express.Router();

supportRouter.post("/chat",authUser, chatWithAI);

export default supportRouter;