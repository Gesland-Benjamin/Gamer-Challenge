// Importe le modèle Game depuis les modèles
import { Challenge, VideoSubmit, User, Game } from "../models/index.js";
import { CoreController } from "./core.controller.js";
import { createChallengeSchema, editChallengeSchema } from "../schemas/index.js";
import Joi from "joi";

class ChallengeController extends CoreController {

// Méthode pour afficher la liste paginée des challenges
challengesListPage = async (req, res) => {
    try {
        // Récupère le numéro de page depuis la requête, ou 1 par défaut
        const page = parseInt(req.query.page) || 1;

        // Définit le nombre de challenges à afficher par page
        const limit = 9;

        // Calcule l'offset pour la requête SQL (combien d'éléments ignorer)
        const offset = (page - 1) * limit;

        // Récupère les challenges paginés et le nombre total d'éléments
        const { count, rows: listChallenges } = await Challenge.findAndCountAll({
            limit, // nombre d'éléments à récupérer
            offset, // nombre d'éléments à ignorer
            order: [["release_date", "DESC"]], // tri par date de sortie décroissante
        });

        // Calcule le nombre total de pages
        const totalPages = Math.ceil(count / limit);

        // Rend la vue "challenges" en passant les challenges, la page courante et le nombre total de pages
        res.status(200).render("challenges", { listChallenges, page, totalPages });
    } catch (error) {
        // En cas d'erreur, affiche la page d'erreur
        console.error(error);
        res.status(404).render("error", { error });
    }
};

    challengeDetailsPage = async (req, res, next) => {
        try {

            const { id } = req.params;

            const challenge = await Challenge.findByPk(id);

            if (!challenge) {
                return this.render404(req, res);
            }

            res.render("challenge", { challenge, page: 1, totalPages: 1 });
        }
        catch (error) {
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
       try {
         const data = Joi.attempt(req.body, createChallengeSchema);
         const newChallenge = await Challenge.create(data);
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
            const { id } = req.params;

            const challenge = await Challenge.findByPk(id);

            if (!challenge) {
                return this.render404(req, res);
            }
            if (challenge.user_id !== req.session.user.id) {
            return this.render403(req, res);
            }
            await challenge.destroy();

            res.status(200).redirect("/challenges");

        } catch (error) {
            console.error(error);
            res.status(400).render("error", { error });
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

            res.status(200).redirect(`/videos/${newVideo.id}`);

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