import { Challenge, Game, User } from "../models/index.js";
import { CoreController } from "./core.controller.js";
import { sequelize } from "../models/index.js";
import Joi from "joi";

// LadderController handles leaderboard logic for top challenges and top users
class LadderController extends CoreController {
    // Get the top 3 challenges with the most votes and render them on the home page
    async getTopChallenges(req, res) {
        const topChallenges = await Challenge.findAll({
            include: [{
                model: User,
                as: 'challenge_voters',
                attributes: [], // Only count, no user attributes
                through: { attributes: [] }
            },
            { 
                model: Game,
                as: 'game',
                attributes: ['id', 'picture']
            }
        ],
            attributes: [
                'id',
                'name',
                [sequelize.fn('COUNT', sequelize.col('challenge_voters.id')), 'voteCount']
            ],
            group: ['Challenge.id', 'game.id'],
            order: [[sequelize.col('voteCount'), 'DESC']],
            limit: 3,
            subQuery: false
        });

        res.render('home', { challenges: topChallenges });
    }

    // Get the top users with the most votes and render them on the ladder page
    async getTopUsers(req, res) {
        const topUsers = await User.findAll({
            include: [{
                model: Challenge,
                as: 'voted_challenges',
                attributes: [],
                through: { attributes: [] }
            }],
            attributes: [
                'id',
                'username',
                'picture',
                [sequelize.fn('COUNT', sequelize.col('voted_challenges.id')), 'voteCount']
            ],
            group: ['User.id'],
            order: [[sequelize.col('voteCount'), 'DESC']],
            subQuery: false,
            raw: true
        });

        res.render('ladder', { users: topUsers });
    }
}

export default new LadderController();