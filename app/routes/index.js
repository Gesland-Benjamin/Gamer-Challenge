import { application, Router } from "express";
import { gameRouter } from "./game.router.js";

 export const mainRouter = Router();

 mainRouter.use(gameRouter);