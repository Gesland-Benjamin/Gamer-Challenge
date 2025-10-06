// Importe Router depuis express pour créer un routeur
import { Router } from "express";
// Importe le contrôleur des jeux
import { AuthController } from "../controllers/index.js";
import { AdminController } from "../controllers/index.js";
import { onlyGuest } from "../middlewares/auth.middleware.js";
// Importe le middleware pour les utilisateurs authentifiés
import { onlyAuthenticated } from "../middlewares/auth.middleware.js";
import { onlyAdmin } from "../middlewares/auth.middleware.js";

// Crée une instance de routeur pour l'authentification&'
export const authRouter = Router();

authRouter.get('/register', onlyGuest, AuthController.showRegisterPage);

authRouter.post('/register', onlyGuest, AuthController.register);

authRouter.get('/login', onlyGuest, AuthController.showLoginPage);

authRouter.post('/login', onlyGuest, AuthController.login);

authRouter.get('/me', onlyAuthenticated, AuthController.getMe);

authRouter.get('/admin', onlyAdmin, AdminController.adminPage);

authRouter.get('/admin/addgame', onlyAdmin, AdminController.formNewGame);

authRouter.post('/admin/addgame', onlyAdmin, AdminController.addNewGame);

authRouter.post('/logout', AuthController.logout);