import { Router } from "express";
import { gameRouter } from "./game.router.js";
import { challengeRouter } from "./challenge.router.js";
import { LadderController } from "../controllers/index.js";
import { authRouter } from "./auth.router.js";
import { apiRouter } from "./apiRouter.js";

import { contactRouter } from "./contact.router.js";


// Créer une instance de routeur principal
export const mainRouter = Router();


// 👉 la page d’accueil appelle directement LadderController
 mainRouter.get('/', LadderController.getTopChallenges);

 mainRouter.use(gameRouter);
 
 mainRouter.use(challengeRouter);

 mainRouter.use(authRouter);

 mainRouter.use(contactRouter);

 mainRouter.get("/legal", (req, res) => {
  res.render("legal"); // ça cherche app/views/legal.ejs
});

 mainRouter.get("/about", (req, res) => {
  res.render("about"); // ça cherche app/views/about.ejs
});

mainRouter.use("/api", apiRouter)
