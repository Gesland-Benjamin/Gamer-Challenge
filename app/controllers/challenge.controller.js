// Importe le modèle Game depuis les modèles
import { Challenge } from "../models/index.js";
import { CoreController } from "./core.controller.js";
import { createChallengeSchema, editChallengeSchema } from "../schemas/index.js";
import Joi from "joi";

class ChallengeController extends CoreController {

    challengesListPage = async (req, res) => {
        console.log(this);

        try {
            const listChallenges = await Challenge.findAll();

            res.status(200).render("challenges", { listChallenges });

        } catch (error) {
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

            res.render("challenge", { challenge });
        }
        catch (error) {
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