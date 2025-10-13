import argon2 from "argon2";
import Joi from "joi";
import { CoreController } from "./core.controller.js";
import { User, Game, ImageSubmit } from "../models/index.js";
import { authSchema, createGameSchema, editGameSchema } from "../schemas/index.js";
import { Op } from "sequelize";

// AdminController handles all admin-related actions such as managing games and users
class AdminController extends CoreController {

    // Render the admin dashboard page
    adminPage = (req, res) => {
        res.render("admin");
    };

    // Render the form to add a new game
    formNewGame = (req, res) => {
        res.render('addGame')
    }

    // Handle the creation of a new game
    addNewGame = async (req, res) => {
        try {
            // 1. Validate game fields using Joi schema
            const gameData = Joi.attempt(req.body, createGameSchema);

            // 2. Create the game in the database
            const newGame = await Game.create(gameData);

            // 3. If an image is provided, validate and add it
            if (req.body.image_url) {
                const imageData = Joi.attempt(
                    {
                        name: req.body.image_title || newGame.name,
                        url: req.body.image_url,
                    },
                    addImageSchema
                );

                // Create the image link to the game
                await ImageSubmit.create({
                    name: imageData.name,
                    url: imageData.url,
                    user_id: req.session.user.id,
                    challenge_id: newGame.id, // or another field if your relation differs
                });
            }

            // 4. Redirect to the new game's page
            res.status(201).redirect(`/games/${newGame.id}`);
        } catch (error) {
            console.error(error);
            res.status(400).render("error", { error });
        }
    };

    // Handle the deletion of a game by its ID
    deleteGame = async (req, res) => {
        try {
            const gameId = req.params.id;

            const game = await Game.findByPk(gameId);

            if (!game) {
                return this.render404(req, res);
            }

            await game.destroy();

            res.status(200).redirect("/games");

        } catch (error) {
            console.error(error);
            res.status(400).render("error", { error });
        }
    };

    // Render the form to edit a game
    formEditGame = async (req, res) => {
        const gameId = req.params.id;
        const game = await Game.findByPk(gameId);
        if (!game) {
            return this.render404(req, res);
        }
        res.status(200).render('editGame', { game });
    }

    // Handle the update of a game's information
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

    // Get and render the list of all users for admin
    getAll = async (req, res) => {
        try {
            const users = await User.findAll({
                attributes: ["id", "username", "isBanned"],
                order: [["username", "ASC"]]
            });
            res.status(200).render("usersList", { users });
        } catch (error) {
            console.error(error);
            return this.render404(req, res);
        }
    };

    // Ban a user by their ID
    banUser = async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).send("Utilisateur introuvable");
            }
            await user.update({ isBanned: true });
            res.redirect("/admin/userslist");
        } catch (error) {
            console.error(error);
            this.render500(req, res);
        }
    }

    // Unban a user by their ID
    unbanUser = async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            if (!user) {
                return this.render404(req, res);
            }
            await user.update({ isBanned: false });
            res.redirect("/admin/userslist");
        } catch (error) {
            console.error(error);
            this.render500(req, res);
        }
    }

};

// Export an instance of AdminController
export default new AdminController();