// Importe Router depuis express pour créer un routeur
import { Router } from "express";
// Importe le contrôleur des jeux
import { authController } from "../controllers/index.js";

// Crée une instance de routeur pour l'authentification&'
export const authRouter = Router();

authRouter.get('/register', authController.showRegisterPage);

authRouter.post('/register', authController.register);

// Route pour récupérer tous les jeux
gameRouter.get('/games', gameController.gamesListPage);

// Route pour récupérer un jeu par son id, avec vérification de l'id
gameRouter.get('/games/:id', checkId, gameController.gameDetailsPage);

// Route pour ajouter un nouveau jeu
gameRouter.post('/games', gameController.addNewGame);

// Route pour supprimer un jeu par son id, avec vérification de l'id
gameRouter.post('/games/:id/delete', checkId, gameController.deleteGame);

// Route pour mettre à jour un jeu par son id, avec vérification de l'id
gameRouter.post('/games/:id/edit', checkId, gameController.editGame); 

