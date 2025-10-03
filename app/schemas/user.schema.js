import Joi from "joi";

// ici on stocke tous les schemas de modification pour les comptes user

export const editUserSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(25).invalid(...forbiddenUsernames),    // interdit de la liste, // pseudo  
    mail: Joi.string().email().max(50),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,255}$")),
});

