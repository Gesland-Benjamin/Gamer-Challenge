import Joi from "joi";

export const addVideoSchema = Joi.object({
    title: Joi.string().min(2).max(100).required(),
    url: Joi.string().uri().max(255).required()
});
