// Importe le modèle Game depuis les modèles
import { Game, Challenge } from "../models/index.js";
import { CoreController } from "./core.controller.js";
import { createGameSchema, editGameSchema } from "../schemas/index.js";
import Joi from "joi";

class GameController extends CoreController {
  gamesListPage = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 6;
      const offset = (page - 1) * limit;

      const { count, rows: listGames } = await Game.findAndCountAll({
        limit,
        offset,
        order: [["name", "ASC"]],
      });

      const totalPages = Math.ceil(count / limit);

      res.render("games", { listGames, page, totalPages });
    } catch (error) {
      console.error(error);
      return this.render404(req, res);
    }
  };

  gameDetailsPage = async (req, res, next) => {
    try {
      const gameId = req.params.id;
      const page = parseInt(req.query.page) || 1;
      const limit = 5;
      const offset = (page - 1) * limit;

      const game = await Game.findByPk(gameId);

      const { count, rows: challenges } = await Challenge.findAndCountAll({
        where: { game_id: gameId },
        limit,
        offset,
        order: [["release_date", "DESC"]],
      });

      const totalPages = Math.ceil(count / limit);

      // Ajoute les challenges paginés à l'objet game
      game.challenges = challenges;

      res.render("game", { game, page, totalPages });
    } catch (error) {
      console.error(error);
      return this.render404(req, res);
    }
  };

  addNewGame = async (req, res) => {
    try {
      const data = Joi.attempt(req.body, createGameSchema);

      const newGame = await Game.create(data);

      res.status(201).redirect(`/games/${newGame.id}`);
    } catch (error) {
      console.error(error);
      return this.render404(req, res);
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
      return this.render404(req, res);
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
}

export default new GameController();
