// This file defines the challenge-related routes for the application using Express Router.
// It handles challenge listing, details, creation, editing, deletion, ladder display, and video uploads.
// Access to certain routes is restricted using authentication and ID-checking middlewares.

import { Router } from "express";
import { ChallengeController } from "../controllers/index.js";
import { LadderController } from "../controllers/index.js";
import { VideoController } from "../controllers/index.js";
import { checkId } from "../middlewares/checkId.middleware.js";
import { onlyAuthenticated, onlyGuest } from "../middlewares/auth.middleware.js";

// Create a router instance for challenge routes
export const challengeRouter = Router();

// Route to get all challenges (GET /challenges)
challengeRouter.get('/challenges', ChallengeController.challengesListPage);

// Route to get a challenge by its ID, with ID validation (GET /challenges/:id)
challengeRouter.get('/challenges/:id', checkId, ChallengeController.challengeDetailsPage);

// Route to show the form to add a new challenge (GET /challenges/:id/addChallenge) - only for authenticated users
challengeRouter.get('/challenges/:id/addChallenge', onlyAuthenticated, ChallengeController.formNewChallenge);

// Route to handle new challenge submission (POST /challenges/:id/addChallenge) - only for authenticated users
challengeRouter.post('/challenges/:id/addChallenge', onlyAuthenticated, ChallengeController.addNewChallenge);

// Route to delete a challenge by its ID (POST /challenges/:id/delete) - only for authenticated users, with ID validation
challengeRouter.post('/challenges/:id/delete', checkId, onlyAuthenticated, ChallengeController.deleteChallenge);

// Route to show the form to edit a challenge (GET /challenges/:id/edit) - only for authenticated users
challengeRouter.get('/challenges/:id/edit', onlyAuthenticated, ChallengeController.formEditChallenge);

// Route to update a challenge by its ID (POST /challenges/:id/edit) - only for authenticated users, with ID validation
challengeRouter.post('/challenges/:id/edit', checkId, onlyAuthenticated, ChallengeController.editChallenge);

// Route to display the ladder of top users (GET /ladder)
challengeRouter.get('/ladder', LadderController.getTopUsers);

// Route to show the form to upload a video for a challenge (GET /challenges/:id/upload/video) - only for authenticated users
challengeRouter.get('/challenges/:id/upload/video', onlyAuthenticated, VideoController.formAddVideo);

// Route to handle video upload for a challenge (POST /challenges/:id/upload/video) - only for authenticated users
challengeRouter.post('/challenges/:id/upload/video', onlyAuthenticated, VideoController.uploadVideo);






