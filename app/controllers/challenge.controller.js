// Importe le modèle Game depuis les modèles
import { Challenge } from "../models/index.js"
import { errorController } from "./error.controller.js";
import { createGameSchema, editGameSchema } from "../schemas/index.js";
import Joi from "joi";

class gameController extends errorController {

    gamesListPage = async (req, res) => {
        console.log(this);

        try {
            const listGames = await Game.findAll({
                order: [
                    ["name", "ASC"]
                ]
            });
            res.status(200).render("games", { listGames });
        } catch (error) {
            console.error(error);
            res.status(404).render("error", { error });
        }
    };

    gameDetailsPage = async (req, res, next) => {
        try {

            const { id } = req.params;

            const game = await Game.findByPk(id);

            if (!game) {
                return this.render404(req, res);
            }

            res.render("game", { game });
        }
        catch (error) {
            console.error(error);
            res.status(404).render("error");
        }
    };

    addNewGame = async (req, res) => {
        try {

            const data = Joi.attempt(req.body, createGameSchema);

            const newGame = await Game.create(data);

            res.status(201).redirect(`/games/${newGame.id}`);

        } catch (error) {
            console.error(error);
            res.status(400).render("error", { error });
        }
    };

    deleteGame = async (req, res) => {
        try {
            const { id } = req.params;

            const game = await Game.findByPk(id);

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
    }
}

export default new gameController();