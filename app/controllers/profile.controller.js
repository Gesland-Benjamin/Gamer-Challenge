// Importe le modèle Game depuis les modèles
import { Challenge, User, Game } from "../models/index.js";
import { CoreController } from "./core.controller.js";
import { createChallengeSchema, editChallengeSchema } from "../schemas/index.js";
import Joi from "joi";

class ProfileController extends CoreController {
    
challengesListUser = async (req, res) => {
    try {
        // Utilisateur connecté
        const userId = req.session.user.id; 
        const user = await User.findByPk(userId);
        if (!user) {
            return this.render404(req, res);
        }

        const page = parseInt(req.query.page) || 1;
        const limit = 9;
        const offset = (page - 1) * limit;

        const { count, rows: listChallenges } = await Challenge.findAndCountAll({
            where: { user_id: userId },
            limit,
            offset,
            order: [["release_date", "DESC"]],
            include: [
                {
                    model: Game,
                    as: "game",
                    attributes: ["id", "name", "picture"]
                },
                { model: User, as: "user", attributes: ["id", "username", "picture"] }
            ]
        });

        const totalPages = Math.ceil(count / limit);

        res.status(200).render("mychallenges", { 
            listChallenges, 
            page, 
            totalPages,
            user,
            session: req.session,
        });

    } catch (error) {
        console.error(error);
        res.status(404).render("error", { error });
    }
};
userProfile = async (req, res) => {
    try {
        const userId = req.params.id; 
        const user = await User.findByPk(userId);
        if (!user) {
            return this.render404(req, res);
        }

        const page = parseInt(req.query.page) || 1;
        const limit = 9;
        const offset = (page - 1) * limit;

        const { count, rows: listChallenges } = await Challenge.findAndCountAll({
            where: { user_id: userId },
            limit,
            offset,
            order: [["release_date", "DESC"]],
            include: [
                {
                    model: Game,
                    as: "game",
                    attributes: ["id", "name", "picture"]
                },
                { model: User, as: "user", attributes: ["id", "username", "picture"] }
            ]
        });

        const totalPages = Math.ceil(count / limit);

        res.status(200).render("profile", { 
            listChallenges, 
            page, 
            totalPages,
            user,
            session: req.session,
        });

    } catch (error) {
        console.error(error);
        res.status(404).render("error", { error });
    }   

}
}
export default new ProfileController();