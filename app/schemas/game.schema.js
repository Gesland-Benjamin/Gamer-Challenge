import Joi from "joi";

// ici on stocke tous les schemas de validation pour les jeux

export const createGameSchema = Joi.object({
    name: Joi.string().trim().min(1).max(100).required(), // nom obligatoire, max 100 caractères
    description: Joi.string().trim().min(1).required(), // description obligatoire
    release_year: Joi.date().required(), // date de sortie obligatoire
    genre: Joi.string().trim().min(1).max(50).required(), // genre obligatoire, max 50 caractères
    picture: Joi.string().trim().min(1).max(255).required(), // url de l'image obligatoire, max 255 caractères
});

export const editGameSchema = Joi.object({
    name: Joi.string().trim().min(1).max(100), // nom, max 100 caractères 
    description: Joi.string().trim().min(1), // description
    release_year: Joi.date(), // date de sortie
    genre: Joi.string().trim().min(1).max(50), // genre, max 50 caractères
    picture: Joi.string().trim().min(1).max(255), // url de l'image, max 255 caractères
});
/*
