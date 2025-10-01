import { Router } from "express";
import { gameRouter } from "./game.router.js";
import { challengeRouter } from "./challenge.router.js";
import { authRouter } from "./auth.router.js";

// Créer une instance de routeur principal
export const mainRouter = Router();

mainRouter.get('/', (req,res) => {
    res.send("Bienvenue sur la page d'accueil !")
})

 mainRouter.use(gameRouter);
 
 mainRouter.use(challengeRouter);

 mainRouter.use(authRouter);