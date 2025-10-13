// This file stores all validation schemas for games using Joi.
// It includes schemas for creating and editing games.

import Joi from "joi";

// Validation schema for creating a game
export const createGameSchema = Joi.object({
    name: Joi.string().trim().min(1).max(100).required(), // Game name, required, max 100 characters
    description: Joi.string().trim().min(1).required(), // Game description, required
    release_year: Joi.date().required(), // Release year, required
    genre: Joi.string().trim().min(1).max(50).required(), // Game genre, required, max 50 characters
    picture: Joi.string().trim().uri().min(1).max(255).required(), // Image URL, required, max 255 characters
});

// Validation schema for editing a game
export const editGameSchema = Joi.object({
    name: Joi.string().trim().min(1).max(100), // Game name, max 100 characters
    description: Joi.string().trim().min(1), // Game description
    release_year: Joi.date(), // Release year
    genre: Joi.string().trim().min(1).max(50), // Game genre, max 50 characters
    picture: Joi.string().trim().uri().min(1).max(255), // Image URL, max 255 characters
}).or('name', 'description', 'release_year', 'genre', 'picture'); // At least one field must be present
