// This file stores all validation schemas for authentication using Joi.
// It includes schemas for registration, login, and profile editing.
// Forbidden usernames are loaded from environment variables.

import Joi from "joi";
import "dotenv/config";

// Load forbidden usernames from environment variables, split into an array
const forbiddenUsernames = process.env.FORBIDDEN_USERNAMES
  ? process.env.FORBIDDEN_USERNAMES.split(",").map(u => u.trim())
  : [];

// Registration validation schema
export const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(25).required().invalid(...forbiddenUsernames), // Username must not be in the forbidden list
  mail: Joi.string().email().max(50).required(), // Email address
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,255}$")).required(), // Password pattern
  privacy: Joi.boolean().valid(true).required().messages({message:'You must accept the privacy policy'}), // Must accept privacy policy
});

// Login validation schema
export const authSchema = Joi.object({
  login: Joi.alternatives().try(
    Joi.string().alphanum().min(3).max(25).required().invalid(...forbiddenUsernames), // Username
    Joi.string().email().required(), // Or email
  ),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(), // Password pattern
});

// Profile editing validation schema
export const editMeSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(25).allow('').invalid(...forbiddenUsernames), // Optional username, not in forbidden list
  mail: Joi.string().email().max(50).allow(''), // Optional email
  favoriteGame : Joi.string().trim().allow('').max(255), // Optional favorite game
  youtube_url : Joi.string().uri().trim().allow('').max(255), // Optional YouTube URL
  twitch_url : Joi.string().uri().trim().allow('').max(255), // Optional Twitch URL
  discord_url : Joi.string().uri().trim().allow('').max(255), // Optional Discord URL

}).or('username', 'mail', 'favoriteGame', 'youtube_url', 'twitch_url', 'discord_url'); // At least one field must be present

