// Importe le modèle Game depuis les modèles
import { Challenge, VideoSubmit, User, Game } from "../models/index.js";
import { CoreController } from "./core.controller.js";
import { createChallengeSchema, editChallengeSchema } from "../schemas/index.js";
import Joi from "joi";

class ChallengeController extends CoreController {

    // Méthode pour afficher la liste paginée des challenges
    challengesListPage = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 9;
        const offset = (page - 1) * limit;

        const { count, rows: listChallenges } = await Challenge.findAndCountAll({
            limit,
            offset,
            order: [["release_date", "DESC"]],
            include: [
                {
                    model: Game,
                    as: "game", // 👈 correspond à l'alias dans ton association
                    attributes: ["id", "name", "picture"]
                }
            ]
        });

        const totalPages = Math.ceil(count / limit);

        res.status(200).render("challenges", { 
            listChallenges, 
            page, 
            totalPages,
            user: req.session.user // utile si tu veux conditionner des boutons dans la vue
        });
    } catch (error) {
        console.error(error);
        res.status(404).render("error", { error });
    }
};

    challengeDetailsPage = async (req, res, next) => {
    try {
        const { id } = req.params;

        const challenge = await Challenge.findByPk(id, {
            include: [
                {
                    model: Game,
                    as: 'game', 
                    attributes: ['id', 'name', 'picture']
                },
                {
                    model: VideoSubmit,
                    as: 'videos',
                    include: [
                        {
                            model: User,
                            as: 'user',
                            attributes: ['username']
                        }
                    ]
                }
            ]
        });

        if (!challenge) {
            return this.render404(req, res);
        }

        res.render("challenge", { challenge, user: req.session.user, page: 1, totalPages: 1 });
    } catch (error) {
        console.error(error);
        res.status(404).render("error", { error });
    }
};

    formNewChallenge = async (req, res) => {
        const gameId = req.params.id
        const game = await Game.findByPk(gameId);
        if (!game) {
            return this.render404(req, res);
        }
        res.render('addChallenge', { game });
    }

    addNewChallenge = async (req, res) => {
        console.log(req.body);
        try {
            const data = Joi.attempt(req.body, createChallengeSchema);
            const newChallenge = await Challenge.create({
                ...data,
                release_date: new Date()
            });
            newChallenge.user_id = req.session.user.id;
            newChallenge.game_id = req.params.id;
            await newChallenge.save();

            res.status(201).redirect(`/challenges/${newChallenge.id}`);
        } catch (error) {
            console.error(error);
            res.status(400).render("error", { error });
        }
    };

    deleteChallenge = async (req, res) => {
        try {
            const challengeId = req.params.id;

            const challenge = await Challenge.findByPk(challengeId);

            if (!challenge) {
                return this.render404(req, res);
            }
            if (challenge.user_id !== req.session.user.id && req.session.user.role !== "admin") {
                return this.render403(req, res);
            }
            await challenge.destroy();

            res.status(200).redirect("/challenges");

        } catch (error) {
            console.error(error);
            res.status(400).render("error", { error });
        }
    };

    formEditChallenge = async (req, res) => {
        try {
            const { id } = req.params;

            const challenge = await Challenge.findByPk(id);

            if (!challenge) {
                return this.render404(req, res);
            }

            // Vérification de l'id de l'utilisateur dans req.session
            if (challenge.user_id !== req.session.user.id && req.session.user.role !== "admin") {
                return this.render403(req, res);
            }

            res.status(200).render("editChallenge", { challenge });

        } catch (error) {
            console.error(error);
            return this.render404(req, res);
        }
    };

    editChallenge = async (req, res) => {
        try {
            const { id } = req.params;

            const challenge = await Challenge.findByPk(id);

            if (!challenge) {
                return this.render404(req, res);
            }

            // Vérification de l'id de l'utilisateur dans req.session

            const data = Joi.attempt(req.body, editChallengeSchema);

            await challenge.update(data);

            res.status(200).redirect(`/challenges/${challenge.id}`);

        } catch (error) {
            console.error(error);
            res.status(400).render("error", { error });
        }
    };

    getUserVideos = async (req, res) => {
        try {

            // On récupère l'id de l'utilisateur connecté
            const { id } = req.session.user;

            // On récupère les vidéos de cet utilisateur avec l'id récupéré
            const user = await User.findByPk(id, {
                include: [{
                    model: VideoSubmit,
                    as: "videos", // Utilise l'alias défini dans l'association
                    attributes: ['title', 'url'],
                }],
            });

            // Si l'utilisateur recherché n'existe pas, on renvoie un message d'erreur
            if (!user) {
                return this.render404(req, res);
            }

            // On renvoie dans la view les vidéos et le username
            res.status(200).render('mychallenges', { videos: user.videos, username: user.username });

        } catch (error) {
            console.error(error);
            res.status(400).render("error", { error: "Une erreur est survenue lors de la récupération des vidéos." });
        }
    };

    

}

export default new ChallengeController();
