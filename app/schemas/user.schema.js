// This file stores all validation schemas for user account modifications using Joi.
// It includes a schema for editing user information.

import Joi from "joi";

// Validation schema for editing a user account
export const editUserSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(25).invalid(...forbiddenUsernames), // Username, not in forbidden list
    mail: Joi.string().email().max(50), // Email address
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,255}$")), // Password pattern
});

