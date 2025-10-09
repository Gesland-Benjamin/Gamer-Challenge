import { Router } from "express";
import { ProfileController } from "../controllers/index.js";
import { checkId } from "../middlewares/checkId.middleware.js";
import { onlyAuthenticated } from "../middlewares/auth.middleware.js";

// Créer une instance de routeur pour les routes de challenges
export const profileRouter = Router();

// Route pour afficher les challenges de l'utilisateur sur son compte 
profileRouter.get('/mychallenges', onlyAuthenticated, ProfileController.challengesListUser)

profileRouter.get('/profile/:id', onlyAuthenticated, ProfileController.userProfile)