// This file stores all validation schemas for challenges using Joi.
// It includes schemas for creating and editing challenges.

import Joi from "joi";

// Validation schema for creating a challenge
export const createChallengeSchema = Joi.object({
    name: Joi.string().trim().min(1).max(100).required(), // Challenge name, required, max 100 characters
    description: Joi.string().trim().min(1).required(), // Challenge description, required
});

// Validation schema for editing a challenge
export const editChallengeSchema = Joi.object({
    name: Joi.string().trim().min(1).max(100), // Challenge name, max 100 characters
    description: Joi.string().trim().min(1), // Challenge description
});

