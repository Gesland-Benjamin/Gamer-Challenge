import Joi from "joi";
import "dotenv/config";

// ici on stocke tous les schemas de validation pour l'authentification

const forbiddenUsernames = process.env.FORBIDDEN_USERNAMES
  ? process.env.FORBIDDEN_USERNAMES.split(",").map(u => u.trim())
  : [];

export const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(25).required().invalid(...forbiddenUsernames),    // interdit de la liste, // pseudo               
  mail: Joi.string().email().max(50).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,255}$")).required(),
  privacy: Joi.boolean().valid(true).required().messages({message:'Vous devez accepter la politique de confidentialité'}), // doit être true

  });

export const authSchema = Joi.object({
  login: Joi.alternatives().try(
    Joi.string().alphanum().min(3).max(25).required().invalid(...forbiddenUsernames),    // interdit de la liste, // pseudo
    Joi.string().email().required(),                    // email
  ),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

