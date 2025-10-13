// This file defines the game-related routes for the application using Express Router.
// It handles game listing, details, creation, editing, and deletion.
// Access to certain routes is restricted using admin and ID-checking middlewares.

import { Router } from "express";
import { AdminController, GameController } from "../controllers/index.js";
import { checkId } from "../middlewares/checkId.middleware.js";
import { onlyAdmin } from "../middlewares/auth.middleware.js";

// Create a router instance for game routes
export const gameRouter = Router();

// Route to get all games (GET /games)
gameRouter.get('/games', GameController.gamesListPage);

// Route to get a game by its ID, with ID validation (GET /games/:id)
gameRouter.get('/games/:id', checkId, GameController.gameDetailsPage);

// Route to show the form to add a new game (GET /admin/addgame) - only for admins
gameRouter.get('/admin/addgame', onlyAdmin, AdminController.formNewGame);

// Route to handle new game submission (POST /admin/addgame) - only for admins
gameRouter.post('/admin/addgame', onlyAdmin, AdminController.addNewGame);

// Route to delete a game by its ID (POST /games/:id/delete) - only for admins, with ID validation
gameRouter.post('/games/:id/delete', checkId, onlyAdmin, AdminController.deleteGame);

// Route to show the form to edit a game (GET /games/:id/edit) - only for admins
gameRouter.get('/games/:id/edit', onlyAdmin, AdminController.formEditGame);

// Route to update a game by its ID (POST /games/:id/edit) - only for admins, with ID validation
gameRouter.post('/games/:id/edit', checkId, onlyAdmin, AdminController.editGame);

