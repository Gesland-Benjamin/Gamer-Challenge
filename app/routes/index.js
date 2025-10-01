import { Router } from "express";
import { gameRouter } from "./game.router.js";
import { challengeRouter } from "./challenge.router.js";
import { contactRouter } from "./contact.router.js";

// Créer une instance de routeur principal
 export const mainRouter = Router();

mainRouter.get('/', (req,res) => {
    res.send("Page d'accueil !")
})

 mainRouter.use(gameRouter);
 
 mainRouter.use(challengeRouter);

 mainRouter.use(contactRouter);