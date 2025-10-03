import { Router } from "express";
import { ChallengeController } from "../controllers/index.js";
import { LadderController } from "../controllers/index.js";
import { checkId } from "../middlewares/checkId.middleware.js";


// Créer une instance de routeur pour les routes de challenges
export const challengeRouter = Router();

// Route pour récupérer tous les challenges
challengeRouter.get('/challenges', ChallengeController.challengesListPage);

// Route pour récupérer un challenge par son id, avec vérification de l'id
challengeRouter.get('/challenges/:id', checkId, ChallengeController.challengeDetailsPage);

challengeRouter.get('/challenge-pagination', ChallengeController.challengesSinglePage);

// Route pour ajouter un nouveau challenge
challengeRouter.post('/challenges', ChallengeController.addNewChallenge);

// Route pour supprimer un challenge par son id, avec vérification de l'id
challengeRouter.post('/challenges/:id/delete', checkId, ChallengeController.deleteChallenge);

// Route pour mettre à jour un challenge par son id, avec vérification de l'id
challengeRouter.post('/challenges/:id/edit', checkId, ChallengeController.editChallenge);

// Route pour afficher le ladder des top challenges
challengeRouter.get('/top-challenges', LadderController.getTopChallenges);

// Route pour afficher le ladder des top users
challengeRouter.get('/ladder', LadderController.getTopUsers);

