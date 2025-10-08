import argon2 from "argon2";
import Joi from "joi";
import { CoreController } from "./index.js";
import { User } from "../models/index.js";
import { registerSchema, authSchema, editMeSchema } from "../schemas/auth.schema.js";
import { Op } from "sequelize";

class AuthController extends CoreController {

  showRegisterPage = (req, res) => {
    res.render("register");
  };

  async register(req, res) {

    const { username, mail, password, privacy } = Joi.attempt(req.body, registerSchema);
    const isUserExists = await User.findOne({ where: { username } });

    if (isUserExists) {
      return this.render409(req, res);
    }

    const hashedPassword = await argon2.hash(password);

    const newUser = await User.create({
      username,
      mail,
      password: hashedPassword,
      privacy,
    });

    res.status(201).redirect("/");

  };

  showLoginPage = (req, res) => {
    res.render("login");
  };

  login = async (req, res) => {
    const { login, password } = Joi.attempt(req.body, authSchema);
    const user = await User.findOne({
      where: { [Op.or]: [{ username: login }, { mail: login }] }
    });

    if (!user) {
      return this.render404(req, res);
    }

    if (user.isBanned) {
      return this.render403(req, res);
    }

    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      return this.render401(req, res);
    }
    // :clé: Stocker les infos utiles en session
    req.session.user = {
      id: user.id,
      username: user.username,
      role: user.role,
      mail: user.mail,
    };
    console.log("Utilisateur connecté :", req.session.user);
    res.redirect("/");

  }

  async getMe(req, res) {
    // Vérifier si l’utilisateur est en session
    if (!req.session.user) {
      return this.render401(req, res);
    }
    const user = await User.findOne({
      where: { username: req.session.user.username },
      attributes: ["username", "mail", "password","favoriteGame", "youtube_url", "twitch_url", "discord_url"]
    });
    if (!user) {
      return this.render404(req, res);
    }

    res.status(200).render("me", { user });
  };

  async logout(req, res) {
    req.session.destroy();
    res.redirect('/');
  };

  editMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user.id);
    if (!user) return this.render404(req, res);

    // Séparer le password des autres champs
    const { password, ...otherData } = req.body;

    // Valider les autres champs (username, mail, favoriteGame, socials_url)
    const validatedData = Joi.attempt(otherData, editMeSchema);

    // Filtrer les champs vides
    const filteredData = Object.fromEntries(
      Object.entries(validatedData).filter(([_, v]) => v !== '')
    );

    // Hasher le password si rempli
    if (password && password.trim() !== '') {
      filteredData.password = await argon2.hash(password);
    }

    // Mise à jour de l'utilisateur
    await user.update(filteredData);

    // Mettre à jour la session si username modifié
    if (filteredData.username) req.session.user.username = filteredData.username;

    res.redirect("/me");

  } catch (error) {
    console.error(error);
    return this.render400(req, res);
  }
};
}

export default new AuthController();
