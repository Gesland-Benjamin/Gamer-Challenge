// This file defines the validation schema for the ladder leaderboard using Joi.
// It ensures that each ladder entry has a valid username and picture URL.

import Joi from "joi";

export const LadderSchema = Joi.object({
    username: Joi.string().trim().min(1).max(25).required(), // Username, required, max 25 characters
    picture: Joi.string().trim().min(1).max(255).required(), // Picture URL, required, max 255 characters
});
