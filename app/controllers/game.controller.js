// Importe le modèle Game depuis les modèles
import { Game, Challenge, User } from "../models/index.js"
import { CoreController } from "./core.controller.js";
import { createGameSchema, editGameSchema } from "../schemas/index.js";
import { sequelize } from "../models/index.js";
import Joi from "joi";

// GameController handles all game-related actions: listing, details, and associated challenges
class GameController extends CoreController {
  // Display the paginated list of games
  gamesListPage = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 6;
      const offset = (page - 1) * limit;

      // Fetch games with pagination
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

  // Display the details of a specific game and its challenges
  gameDetailsPage = async (req, res) => {
    try {
      const { id } = req.params;
      const page = parseInt(req.query.page) || 1;
      const limit = 5;
      const offset = (page - 1) * limit;

      // 1️⃣ Fetch the game by its ID
      const game = await Game.findByPk(id);
      if (!game) return this.render404(req, res);

      // 2️⃣ Fetch paginated challenges for the game, including vote counts
      const challenges = await Challenge.findAll({
        where: { game_id: id },
        limit,
        offset,
        order: [["release_date", "DESC"]],
        include: [
          {
            model: User,
            as: "challenge_voters",
            attributes: [], // juste pour le COUNT
            through: { attributes: [] },
          },
        ],
        attributes: {
          include: [
            [
              sequelize.literal(`(
              SELECT COUNT(*)
              FROM vote_challenge AS vc
              WHERE vc.challenge_id = "Challenge".id
            )`),
              "voteCount",
            ],
          ],
        },
      });

      // 3️⃣ Get total number of challenges for pagination
      const totalChallenges = await Challenge.count({ where: { game_id: id } });
      const totalPages = Math.ceil(totalChallenges / limit);

      // 4️⃣ Attach challenges to the game object
      game.challenges = challenges;

      res.render("game", { game, page, user: req.session.user, totalPages });
    } catch (error) {
      console.error(error);
      return this.render404(req, res);
    }
  };
}

export default new GameController();
