import argon2 from "argon2";
import Joi from "joi";
import { CoreController } from "./core.controller.js";
import { User } from "../models/index.js";
import { registerSchema, authSchema  } from "../schemas/auth.schema.js";

class AuthController extends CoreController {
  
  showRegisterPage = (req, res) => {
    res.render("register");
  };

  async register(req, res) {

    const { username, mail, password } = Joi.attempt(req.body, registerSchema);
    const isUserExists = await User.findOne({ where: { username } });

    if (isUserExists) {
      return this.render409(req, res);
    }

    const hashedPassword = await argon2.hash(password);
    
    const newUser = await User.create({
      username,
      mail,
      password: hashedPassword
    });

    res.status(201).redirect("/", { newUser });
    
  };
  
  showLoginPage = (req, res) => {
    res.render("login");
  };

  async login(req, res) {
    const { username , mail, password } = Joi.attempt(req.body, authSchema);
    const user = await User.findOne({
      where: { [Op.or]: [{ username : login }, { mail : login }] }
    });

    if (!user) {
      return this.render404(req, res);
    }

    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      return this.render403(req, res);
    }
    // :clé: Stocker les infos utiles en session
    req.session.user = {
      id: user.id,
      username: user.username,
      role: user.role.name,
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
      attributes: ["username"]
    });
    if (!user) {
      return this.render404(req, res);
    }
    //a changer avec la view mon compte
    res.status(200).render("user", { user }); 
  };
  async logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        return this.render500(req, res);
      }
      res.clearCookie("connect.sid"); // supprime le cookie côté client
      res.redirect("/login", { message: "Déconnexion réussie" });
    }); 
  };

};

export default new AuthController();

