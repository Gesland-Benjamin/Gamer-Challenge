import { Router } from "express";
import { gameRouter } from "./game.router.js";
import { challengeRouter } from "./challenge.router.js";

import { authRouter } from "./auth.router.js";

import { contactRouter } from "./contact.router.js";


// Créer une instance de routeur principal
export const mainRouter = Router();


mainRouter.get('/', (req, res) => {
    res.render('home', {
        title: "Page d'accueil",
        message: "Bienvenue sur GamerChallenges !"
    });
});

 mainRouter.use(gameRouter);
 
 mainRouter.use(challengeRouter);

 mainRouter.use(authRouter);

 mainRouter.use(contactRouter);

