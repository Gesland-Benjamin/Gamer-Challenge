import argon2 from "argon2";
import Joi from "joi";
import { CoreController } from "./core.controller.js";
import { User, Game, ImageSubmit } from "../models/index.js";
import { authSchema, createGameSchema, editGameSchema } from "../schemas/index.js";
import { Op } from "sequelize";

class AdminController extends CoreController {

    adminPage = (req, res) => {
        res.render("admin");
    };

    formNewGame = (req, res) => {
        res.render('addGame')
    }


    addNewGame = async (req, res) => {
        try {
            // ✅ 1. Validation des champs du jeu
            const gameData = Joi.attempt(req.body, createGameSchema);

            // ✅ 2. Création du jeu
            const newGame = await Game.create(gameData);

            // ✅ 3. Validation et ajout de l’image (si fournie)
            if (req.body.image_url) {
                const imageData = Joi.attempt(
                    {
                        name: req.body.image_title || newGame.name,
                        url: req.body.image_url,
                    },
                    addImageSchema
                );

                // Création du lien image → jeu
                await ImageSubmit.create({
                    name: imageData.name,
                    url: imageData.url,
                    user_id: req.session.user.id,
                    challenge_id: newGame.id, // ou autre champ si ta relation diffère
                });
            }

            // ✅ 4. Redirection vers la page du jeu
            res.status(201).redirect(`/games/${newGame.id}`);
        } catch (error) {
            console.error(error);
            res.status(400).render("error", { error });
        }
    };

    deleteGame = async (req, res) => {
        try {
                   const gameId = req.params.id;
       
                   const game = await Game.findByPk(gameId);
       
                   if (!game) {
                       return this.render404(req, res);
                   }

                   await game.destroy();
       
                   res.status(200).redirect("/games");
       
               } catch (error) {
                   console.error(error);
                   res.status(400).render("error", { error });
               }
           };

    editGame = async (req, res) => {
        try {
            const { id } = req.params;

            const game = await Game.findByPk(id);

            if (!game) {
                return this.render404(req, res);
            }

            const data = Joi.attempt(req.body, editGameSchema);

            await game.update(data);

            res.status(200).redirect(`/games/${game.id}`);
        } catch (error) {
            console.error(error);
            res.status(400).render("error", { error });
        }
    };

};

export default new AdminController();