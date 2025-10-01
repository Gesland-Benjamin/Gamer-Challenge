// Importe Router depuis express pour créer un routeur
import { Router } from "express";
// Importe le contrôleur des jeux
import { ContactController } from "../controllers/index.js";

// Crée une instance de routeur pour les contacts
export const contactRouter = Router();

// Définit une route GET pour /contact qui utilise la méthode contactFormPage du contrôleur
contactRouter.get('/contact', ContactController.contactFormPage);

