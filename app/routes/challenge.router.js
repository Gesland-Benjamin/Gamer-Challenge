import { Router } from "express";
import { challengeController } from "../controllers/index.js";
import { checkId } from "../middlewares/checkId.middleware.js";

// Créer une instance de routeur pour les routes de challenges
export const challengeRouter = Router();

// Route pour récupérer tous les challenges
challengeRouter.get('/challenges', challengeController.challengesListPage);

// Route pour récupérer un challenge par son id, avec vérification de l'id
challengeRouter.get('/challenges/:id', checkId, challengeController.challengeDetailsPage);

// Route pour ajouter un nouveau challenge
challengeRouter.post('/challenges', challengeController.addNewChallenge);

// Route pour supprimer un challenge par son id, avec vérification de l'id
challengeRouter.post('/challenges/:id/delete', checkId, challengeController.deleteChallenge);

// Route pour mettre à jour un challenge par son id, avec vérification de l'id
challengeRouter.post('/challenges/:id/edit', checkId, challengeController.editChallenge);
