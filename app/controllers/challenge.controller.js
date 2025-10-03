// Importe le modèle Game depuis les modèles
import { Challenge } from "../models/index.js";
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
    
    challengesSinglePage = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 1;
        const offset = (page - 1) * limit;

        // Récupère le challenge courant et le nombre total de challenges
        const { count, rows } = await Challenge.findAndCountAll({
            limit,
            offset,
            order: [["release_date", "DESC"]],
            include: [
                { model: User, as: "user" },
                { model: Participation, as: "participations" }
            ]
        });

        const challenge = rows[0];
        const totalPages = Math.ceil(count / limit);

        res.render("challenge", { challenge, page, totalPages });
    } catch (error) {
        console.error(error);
        res.status(404).render("error", { error });
    }
};

    addNewChallenge = async (req, res) => {
        try {

            const data = Joi.attempt(req.body, createChallengeSchema);

            const newChallenge = await Challenge.create(data);

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

            res.status(200).redirect(`/challenges/${challenge.id}`);

        } catch (error) {
            console.error(error);
            res.status(400).render("error", { error });
        }
    }
}

export default new ChallengeController();