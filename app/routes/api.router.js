// This file defines the API routes for the application using Express Router.
// It handles API endpoints related to likes, managed by the LikeController.

import express from "express";
import LikeController from "../controllers/like.controller.js";

export const apiRouter = express.Router();

// Route to toggle like status for a resource by ID (POST /like/:id)
apiRouter.post("/like/:id", LikeController.toggleLike);

