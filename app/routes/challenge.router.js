import { Router } from "express";
import { ChallengeController } from "../controllers/index.js";
import { LadderController } from "../controllers/index.js";
import { VideoController } from "../controllers/index.js";
import { checkId } from "../middlewares/checkId.middleware.js";
import { onlyAuthenticated, onlyGuest } from "../middlewares/auth.middleware.js";


// Créer une instance de routeur pour les routes de challenges
export const challengeRouter = Router();

// Route pour récupérer tous les challenges
challengeRouter.get('/challenges', ChallengeController.challengesListPage);

// Route pour récupérer un challenge par son id, avec vérification de l'id
challengeRouter.get('/challenges/:id', checkId, ChallengeController.challengeDetailsPage);

// Route pour afficher le formulaire d'ajout de challenge 
challengeRouter.get('/challenges/:id/addChallenge', onlyAuthenticated, ChallengeController.formNewChallenge);

challengeRouter.post('/challenges/:id/addChallenge', onlyAuthenticated, ChallengeController.addNewChallenge);

// Route pour supprimer un challenge par son id, avec vérification de l'id
challengeRouter.post('/challenges/:id/delete', checkId, onlyAuthenticated, ChallengeController.deleteChallenge);

// Route pour afficher le formulaire d'édition d'un challenge
challengeRouter.get('/challenges/:id/edit', onlyAuthenticated, ChallengeController.formEditChallenge);

// Route pour mettre à jour un challenge par son id, avec vérification de l'id 
challengeRouter.post('/challenges/:id/edit', checkId, onlyAuthenticated, ChallengeController.editChallenge);

// Route pour afficher le ladder des top users
challengeRouter.get('/ladder', LadderController.getTopUsers);

// Routes
challengeRouter.get('/challenges/:id/upload/video', onlyAuthenticated, VideoController.formAddVideo);

challengeRouter.post('/challenges/:id/upload/video', onlyAuthenticated, VideoController.uploadVideo);






