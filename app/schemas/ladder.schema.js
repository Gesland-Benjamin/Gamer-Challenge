import Joi from "joi";

export const LadderSchema = Joi.object({
    username: Joi.string().trim().min(1).max(25).required(),
    picture: Joi.string().trim().min(1).max(255).required(), 
});
