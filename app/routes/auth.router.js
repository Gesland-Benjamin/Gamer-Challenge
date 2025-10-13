// This file defines the authentication routes for the application using Express Router.
// It handles registration, login, user profile, password management, and admin access.
// Access to certain routes is restricted using authentication and authorization middlewares.

import { Router } from "express";
import { AuthController } from "../controllers/index.js";
import { AdminController } from "../controllers/index.js";
import { onlyGuest } from "../middlewares/auth.middleware.js";
import { onlyAuthenticated } from "../middlewares/auth.middleware.js";
import { onlyAdmin } from "../middlewares/auth.middleware.js";

// Create a router instance for authentication
export const authRouter = Router();

// Show registration page (GET /register) - only for guests
authRouter.get('/register', onlyGuest, AuthController.showRegisterPage);

// Handle registration form submission (POST /register) - only for guests
authRouter.post('/register', onlyGuest, AuthController.register);

// Show login page (GET /login) - only for guests
authRouter.get('/login', onlyGuest, AuthController.showLoginPage);

// Handle login form submission (POST /login) - only for guests
authRouter.post('/login', onlyGuest, AuthController.login);

// Get current user's profile (GET /me) - only for authenticated users
authRouter.get('/me', onlyAuthenticated, AuthController.getMe);

// Edit current user's profile (POST /me) - only for authenticated users
authRouter.post('/me', onlyAuthenticated, AuthController.editMe);

// Show admin dashboard (GET /admin) - only for admins
authRouter.get('/admin', onlyAdmin, AdminController.adminPage);

// Logout the current user (POST /logout)
authRouter.post('/logout', AuthController.logout);

// Delete current user's account (POST /me/delete) - only for authenticated users
authRouter.post('/me/delete', onlyAuthenticated, AuthController.deleteAccount);

// Show password change page (GET /me/password) - only for authenticated users
authRouter.get('/me/password', onlyAuthenticated, AuthController.showPasswordPage);

// Handle password update (POST /me/password) - only for authenticated users
authRouter.post('/me/password', onlyAuthenticated, AuthController.updatePassword);

