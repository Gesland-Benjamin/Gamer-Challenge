import Joi from "joi";

// ici on stocke tous les schemas de validation pour les challenges

export const createChallengeSchema = Joi.object({
    name: Joi.string().trim().min(1).max(100).required(), // nom du challenge, obligatoire, max 100 caractères
    description: Joi.string().trim().min(1).required(), // description du challenge, obligatoire
    release_date: Joi.date().required(), // date de sortie du challenge, obligatoire
    picture: Joi.string().trim().min(1).max(255).required(), // url de l'image du challenge, obligatoire, max 255 caractères
    username: Joi.string().trim().min(1).max(100).required(), // nom d'utilisateur associé au challenge, obligatoire, max 100 caractères
});

export const editChallengeSchema = Joi.object({
    name: Joi.string().trim().min(1).max(100), // nom du challenge, max 100 caractères
    description: Joi.string().trim().min(1), // description du challenge
    release_date: Joi.date(), // date de sortie du challenge
    picture: Joi.string().trim().min(1).max(255), // url de l'image du challenge, max 255 caractères
    username: Joi.string().trim().min(1).max(100), // nom d'utilisateur associé au challenge, max 100 caractères
});

