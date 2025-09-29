import { Router } from "express";
import { gameController } from "../controllers/index.js";

 export const gameRouter = Router();

 gameRouter.get('/games', gameController.getAll);

