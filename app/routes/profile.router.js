// This file defines the profile-related routes for the application using Express Router.
// It handles displaying the user's challenges and user profile pages.
// Access to these routes is restricted to authenticated users only.

import { Router } from "express";
import { ProfileController } from "../controllers/index.js";
import { checkId } from "../middlewares/checkId.middleware.js";
import { onlyAuthenticated } from "../middlewares/auth.middleware.js";

// Create a router instance for profile routes
export const profileRouter = Router();

// Route to display the current user's challenges (GET /mychallenges)
profileRouter.get('/mychallenges', onlyAuthenticated, ProfileController.challengesListUser)

// Route to display a user's profile by ID (GET /profile/:id)
profileRouter.get('/profile/:id', onlyAuthenticated, ProfileController.userProfile)