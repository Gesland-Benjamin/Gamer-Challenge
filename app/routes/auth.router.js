// Importe Router depuis express pour créer un routeur
import { Router } from "express";
// Importe le contrôleur des jeux
import { AuthController } from "../controllers/index.js";

// Crée une instance de routeur pour l'authentification&'
export const authRouter = Router();

authRouter.get('/register', AuthController.showRegisterPage);

authRouter.post('/register', AuthController.register);

authRouter.get('/login', AuthController.showLoginPage);

authRouter.post('/login', AuthController.login);

authRouter.get('/me', AuthController.getMe);

authRouter.post('/logout', AuthController.logout);