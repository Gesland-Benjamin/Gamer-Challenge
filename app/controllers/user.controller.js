// Importe le modèle User depuis les modèles
import { User} from "../models/index.js"
import { CoreController } from "./core.controller.js";
import { editUserSchema } from "../schemas/index.js";
import Joi from "joi";

// UserController handles user account editing and deletion
class UserController extends CoreController {
    // Delete the current user's account
    deleteAccount = async (req, res) => {
        try {
            const id = req.user.id;

            const user = await User.findByPk(id);

            if (!user) {
                return this.render404(req, res);
            }

            await user.destroy();
            req.session.destroy((err) => {
                if (err) console.error("Erreur de suppression du compte:", err);
            });

        } catch (error) {
            console.error(error);
            return res.status(500).render("error", { message: "Erreur serveur" });
        }
            res.redirect("/");
        };

    // Edit the current user's account information
    editAccount = async (req, res) => {
        try {
            const id = req.user.id;

            const user = await User.findByPk(id);

            if (!user) {
                return this.render404(req, res);
            }
    
            const data = Joi.attempt(req.body, editUserSchema);
    
            await user.update(data);
    
            res.status(200).redirect(`/user/${user.id}`);
    
        } catch (error) {
            console.error(error);
            if (error.isJoi) {
                return res.status(400).render("error", { message: "Informations invalides." });
            }
            res.status(500).render("error", { message: "Une erreur est survenue." });
        }
    }
};