import argon2 from "argon2";
import Joi from "joi";
import { CoreController } from "./index.js";
import { User } from "../models/index.js";
import { registerSchema, authSchema, editMeSchema } from "../schemas/auth.schema.js";
import { Op } from "sequelize";

// AuthController handles user authentication, registration, profile management, and password operations
class AuthController extends CoreController {

  // Render the registration page
  showRegisterPage = (req, res) => {
    res.render("register");
  };

  // Handle user registration
  register = async (req, res) => {
    // Validate registration data
    const { username, mail, password, privacy } = Joi.attempt(req.body, registerSchema);
    // Check if the username already exists
    const isUserExists = await User.findOne({ where: { username } });
    if (isUserExists) {
      return this.render409(req, res);
    }
    // Hash the password
    const hashedPassword = await argon2.hash(password);
    // Create the new user
    const newUser = await User.create({
      username,
      mail,
      password: hashedPassword,
      privacy,
    });
    res.status(201).redirect("/");
  };

  // Render the login page
  showLoginPage = (req, res) => {
    res.render("login");
  };

  // Handle user login
  login = async (req, res) => {
    // Validate login data
    const { login, password } = Joi.attempt(req.body, authSchema);
    // Find user by username or email
    const user = await User.findOne({
      where: { [Op.or]: [{ username: login }, { mail: login }] }
    });
    if (!user) {
      return this.render404(req, res);
    }
    // Check if user is banned
    if (user.isBanned) {
      return this.render403(req, res);
    }
    // Verify password
    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      req.session.flashMessage = { type: 'error', message: 'Le mot de passe actuel est incorrect.' };
      return res.redirect('/register');
    };
    // Store user info in session
    req.session.user = {
      id: user.id,
      username: user.username,
      role: user.role,
      mail: user.mail,
      picture : user.picture,
    };
    console.log("Utilisateur connecté :", req.session.user);
    res.redirect("/");
  }

  // Get the current user's profile page
  async getMe(req, res) {
    if (!req.session.user) {
      return this.render401(req, res);
    }
    const user = await User.findOne({
      where: { username: req.session.user.username },
      attributes: ["username", "mail", "password", "favoriteGame", "youtube_url", "twitch_url", "discord_url"]
    });
    if (!user) {
      return this.render404(req, res);
    }
    res.status(200).render("me", { user });
  };

  // Log out the current user
  async logout(req, res) {
    req.session.destroy();
    res.redirect('/');
  };

  // Edit the current user's profile
  editMe = async (req, res) => {
    try {
      const user = await User.findByPk(req.session.user.id);
      if (!user) return this.render404(req, res);
      const Data = req.body;
      // Validate profile fields
      const validatedData = Joi.attempt(Data, editMeSchema);
      // Filter out empty fields
      const filteredData = Object.fromEntries(
        Object.entries(validatedData).map(([key, value]) => [key, value === '' ? null : value])
      );
      // Update user
      await user.update(filteredData);
      // Update session if username changed
      if (filteredData.username) req.session.user.username = filteredData.username;
      req.session.flashMessage = { type: 'success', message: 'Profil mis à jour avec succès !' };
      res.redirect("/me");
    } catch (error) {
      console.error(error);
      return this.render400(req, res);
    }
  };

  // Render the password change page
  showPasswordPage = (req, res) => {
    res.render("password");
  };

  // Update the user's password
  updatePassword = async (req, res) => {
    try {
      const userId = req.session.user?.id;
      if (!userId) return this.render401(req, res);
      const { currentPassword, newPassword, confirmPassword } = req.body;
      // Check if new passwords match
      if (newPassword !== confirmPassword) {
        req.session.flashMessage = { type: 'error', message: 'Les nouveaux mots de passe ne correspondent pas.' };
        return res.redirect('/me/password');
      }
      const user = await User.findByPk(userId);
      if (!user) return this.render404(req, res);
      // Verify current password
      const isCurrentPasswordValid = await argon2.verify(user.password, currentPassword);
      if (!isCurrentPasswordValid) {
        req.session.flashMessage = { type: 'error', message: 'Le mot de passe actuel est incorrect.' };
        return res.redirect('/me/password');
      }
      // Hash and update new password
      const hashedNewPassword = await argon2.hash(newPassword);
      await user.update({ password: hashedNewPassword });
      req.session.flashMessage = { type: 'success', message: 'Mot de passe mis à jour avec succès !' };
      res.redirect('/me');
    } catch (error) {
      console.error(error);
      return this.render400(req, res);
    }
  };

  // Delete the current user's account
  deleteAccount = async (req, res) => {
    try {
      const userId = req.session.user?.id;
      if (!userId) return this.render401(req, res);
      const user = await User.findByPk(userId);
      if (!user) return this.render404(req, res);
      await user.destroy();
      req.session.destroy((err) => {
        if (err) {
          console.error("Erreur lors de la destruction de la session :", err);
          return this.render400(req, res);
        }
      });
      res.redirect('/');
    } catch (error) {
      console.error(error);
      return this.render400(req, res);
    }
  };
}
export default new AuthController();
