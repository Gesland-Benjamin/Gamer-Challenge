// This file defines the validation schema for video submissions using Joi.
// It ensures that each video has a valid title and URL.

import Joi from "joi";

export const addVideoSchema = Joi.object({
    title: Joi.string().min(2).max(100).required(), // Video title, required, 2-100 characters
    url: Joi.string().uri().max(255).required() // Video URL, required, must be a valid URI, max 255 characters
});
