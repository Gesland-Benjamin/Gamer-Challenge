// This file defines the main router for the application using Express Router.
// It imports and mounts all feature routers and controllers, organizing the application's route structure.

import { Router } from "express";
import { gameRouter } from "./game.router.js";
import { challengeRouter } from "./challenge.router.js";
import { LadderController } from "../controllers/index.js";
import { authRouter } from "./auth.router.js";
import { apiRouter } from "./api.router.js";
import { adminRouter } from "./admin.router.js";
import { searchRouter } from "./search.router.js"
import { profileRouter } from "./profile.router.js";
import { contactRouter } from "./contact.router.js";

// Create the main router instance
export const mainRouter = Router();

// Home page route, handled directly by LadderController (GET /)
mainRouter.get('/', LadderController.getTopChallenges);

// Mount feature routers for modular route management
mainRouter.use(gameRouter);
mainRouter.use(challengeRouter);
mainRouter.use(profileRouter);
mainRouter.use(authRouter);
mainRouter.use(contactRouter);
mainRouter.use(adminRouter);

// Legal notice page (GET /legal)
mainRouter.get("/legal", (req, res) => {
  res.render("legal"); // Renders app/views/legal.ejs
});

// About page (GET /about)
mainRouter.get("/about", (req, res) => {
  res.render("about"); // Renders app/views/about.ejs
});

// Mount API router under /api
mainRouter.use("/api", apiRouter)

// Mount search router for all /search routes
mainRouter.use('/', searchRouter); // All /search routes are handled here