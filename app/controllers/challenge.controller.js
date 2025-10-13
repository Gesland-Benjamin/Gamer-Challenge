// Importe le modèle Game depuis les modèles
import { Challenge, VideoSubmit, User, Game } from "../models/index.js";
import { CoreController } from "./core.controller.js";
import { createChallengeSchema, editChallengeSchema } from "../schemas/index.js";
import Joi from "joi";

// ChallengeController handles all challenge-related actions: listing, details, creation, editing, deletion, and user videos
class ChallengeController extends CoreController {

    // Display the paginated list of challenges
    challengesListPage = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 9;
        const offset = (page - 1) * limit;

        // Fetch challenges with pagination and associated game
        const { count, rows: listChallenges } = await Challenge.findAndCountAll({
            limit,
            offset,
            order: [["release_date", "DESC"]],
            include: [
                {
                    model: Game,
                    as: "game",
                    attributes: ["id", "name", "picture"]
                }
            ]
        });

        const totalPages = Math.ceil(count / limit);

        res.status(200).render("challenges", { 
            listChallenges, 
            page, 
            totalPages,
            user: req.session.user // Useful for conditional buttons in the view
        });
    } catch (error) {
        console.error(error);
       return this.render404(req, res);
    }
};

    // Display the details of a specific challenge
    challengeDetailsPage = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Fetch challenge with associated game and videos
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
        return this.render404(req, res);
    }
};

    // Render the form to create a new challenge for a game
    formNewChallenge = async (req, res) => {
        const gameId = req.params.id
        const game = await Game.findByPk(gameId);
        if (!game) {
            return this.render404(req, res);
        }
        res.render('addChallenge', { game });
    }

    // Handle the creation of a new challenge
    addNewChallenge = async (req, res) => {
        try {
            // Validate challenge data
            const data = Joi.attempt(req.body, createChallengeSchema);
            // Create the challenge
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
            return this.render400(req, res);
        }
    };

    // Handle the deletion of a challenge
    deleteChallenge = async (req, res) => {
        try {
            const challengeId = req.params.id;

            const challenge = await Challenge.findByPk(challengeId);

            if (!challenge) {
                return this.render404(req, res);
            }
            // Only the challenge owner or an admin can delete
            if (challenge.user_id !== req.session.user.id && req.session.user.role !== "admin") {
                return this.render403(req, res);
            }
            await challenge.destroy();

            res.status(200).redirect("/challenges");

        } catch (error) {
            console.error(error);
            return this.render400(req, res);
        }
    };

    // Render the form to edit a challenge
    formEditChallenge = async (req, res) => {
        try {
            const { id } = req.params;

            const challenge = await Challenge.findByPk(id);

            if (!challenge) {
                return this.render404(req, res);
            }

            // Only the challenge owner or an admin can edit
            if (challenge.user_id !== req.session.user.id && req.session.user.role !== "admin") {
                return this.render403(req, res);
            }

            res.status(200).render("editChallenge", { challenge });

        } catch (error) {
            console.error(error);
            return this.render404(req, res);
        }
    };

    // Handle the update of a challenge
    editChallenge = async (req, res) => {
        try {
            const { id } = req.params;

            const challenge = await Challenge.findByPk(id);

            if (!challenge) {
                return this.render404(req, res);
            }

            // Validate and update challenge data
            const data = Joi.attempt(req.body, editChallengeSchema);

            await challenge.update(data);

            res.status(200).redirect(`/challenges/${challenge.id}`);

        } catch (error) {
            console.error(error);
            return this.render400(req, res);
        }
    };

    // Get all videos submitted by the current user
    getUserVideos = async (req, res) => {
        try {
            // Get the logged-in user's id
            const { id } = req.session.user;
            // Fetch the user's videos
            const user = await User.findByPk(id, {
                include: [{
                    model: VideoSubmit,
                    as: "videos",
                    attributes: ['title', 'url'],
                }],
            });
            if (!user) {
                return this.render404(req, res);
            }
            // Render the user's videos page
            res.status(200).render('mychallenges', { videos: user.videos, username: user.username });
        } catch (error) {
            console.error(error);
            res.status(400).render("error", { error: "Une erreur est survenue lors de la récupération des vidéos." });
        }
    };
}

export default new ChallengeController();
