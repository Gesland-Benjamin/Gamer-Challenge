import express from 'express';
import { SearchController } from '../controllers/index.js';

export const searchRouter = express.Router();

searchRouter.get('/search', SearchController.search);

