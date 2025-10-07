import express from "express";
import LikeController from "../controllers/like.controller.js";

export const apiRouter = express.Router();

apiRouter.post("/like/:id", LikeController.toggleLike);

