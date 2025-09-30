// Importe Router depuis express pour créer un routeur
import { Router } from "express";
// Importe le contrôleur des jeux
import { GameController } from "../controllers/index.js";
// Importe le middleware pour vérifier l'id
import { checkId } from "../middlewares/checkId.middleware.js";

// Crée une instance de routeur pour les routes de jeux
export const gameRouter = Router();

// Route pour récupérer tous les jeux
gameRouter.get('/games', GameController.gamesListPage);

// Route pour récupérer un jeu par son id, avec vérification de l'id
gameRouter.get('/games/:id', checkId, GameController.gameDetailsPage);

// Route pour ajouter un nouveau jeu
gameRouter.post('/games', GameController.addNewGame);

// Route pour supprimer un jeu par son id, avec vérification de l'id
gameRouter.post('/games/:id/delete', checkId, GameController.deleteGame);

// Route pour mettre à jour un jeu par son id, avec vérification de l'id
gameRouter.post('/games/:id/edit', checkId, GameController.editGame);

