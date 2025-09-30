import argon2 from "argon2";
import Joi from "joi";
import { errorController } from "./error.controller.js";
import { User } from "../models/index.js";
import { registerSchema, authSchema  } from "../schemas/auth.schema.js";

class authController extends errorController {
  
  showRegisterPage = (req, res) => {
    res.render("register");
  }

  async register(req, res) {

    const { username, mail, password } = Joi.attempt(req.body, authSchema);
    const isUserExists = await User.findOne({ where: { username } });

    if (isUserExists) {
      return res.status(409).json({ error: "Cet utilisateur existe déjà." });
    }

    const hashedPassword = await argon2.hash(password);
    
    const newUser = await User.create({
      username,
      mail,
      password: hashedPassword
    });

    res.status(201).redirect("/", { newUser });
    
  },
  async login(req, res) {
    const { username, password } = Joi.attempt(req.body, authSchema);
    const user = await User.findOne({
      where: { username },
      include: { model: Role, as: "role", attributes: ["name"] },
    });
    if (!user) {
      return res.status(404).json({ error: "User does not exists" });
    }
    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      return res.status(403).json({ error: "Password is not correct, retry" });
    }
    // :clé: Stocker les infos utiles en session
    req.session.user = {
      id: user.id,
      username: user.username,
      role: user.role.name,
    };
    res.status(200).json({
      message: "Utilisateur connecté",
      user: req.session.user,
    });
  },
  async getMe(req, res) {
    // Vérifier si l’utilisateur est en session
    if (!req.session.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    const user = await User.findOne({
      where: { username: req.session.user.username },
      attributes: ["username"],
      include: { model: Role, as: "role", attributes: ["name"] },
    });
    if (!user) {
      return res.status(404).json({ error: "User does not exists" });
    }
    res.status(200).json({ user });
  },
  async logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Logout failed" });
      }
      res.clearCookie("connect.sid"); // supprime le cookie côté client
      res.status(200).json({ message: "Utilisateur déconnecté" });
    });
  },

};

export default new authController();

