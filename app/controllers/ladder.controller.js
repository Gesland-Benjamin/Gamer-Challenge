import { Challenge, User } from "../models/index.js";
import { CoreController } from "./core.controller.js";
import { sequelize } from "../models/index.js";
import Joi from "joi";

class LadderController extends CoreController {
    // On récupère les votes pour les Challenges
    async getTopChallenges(req, res) {
        const topChallenges = await Challenge.findAll({
            include: [{
                model: User,
                as: 'challenge_voters',
                attributes: [], // On ne veut pas les attributs des users, juste le compte
                through: { attributes: [] } // On ne veut pas les attributs de la table de jointure
            }],
            attributes: [
                'id',
                'name',
                [sequelize.fn('COUNT', sequelize.col('challenge_voters.id')), 'voteCount']
                // ⚠️ mets bien "challenge_voters.id" (clé primaire du user),
                // et pas "challenge_voters.user_id", car Sequelize gère l'alias différemment
            ],
            group: ['Challenge.id'],
            order: [[sequelize.col('voteCount'), 'DESC']],
            limit: 3,
            subQuery: false
        });

        res.render('home', { challenges: topChallenges });
    }

    // On récupère les votes pour les Users
    async getTopUsers(req, res) {
        const topUsers = await User.findAll({
            include: [{
                model: Challenge,
                as: 'voted_challenges',
                attributes: [], // On ne veut pas les attributs des users, juste le compte
                through: { attributes: [] } // On ne veut pas les attributs de la table de jointure
            }],
            attributes: [
                'id',
                'username',
                [sequelize.fn('COUNT', sequelize.col('voted_challenges.id')), 'voteCount']
                // ⚠️ mets bien "challenge_voters.id" (clé primaire du user),
                // et pas "challenge_voters.user_id", car Sequelize gère l'alias différemment
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