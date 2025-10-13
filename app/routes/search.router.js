// This file defines the search-related routes for the application using Express Router.
// It handles the search functionality via the SearchController.

import express from 'express';
import { SearchController } from '../controllers/index.js';

export const searchRouter = express.Router();

// Route to handle search requests (GET /search)
searchRouter.get('/search', SearchController.search);

