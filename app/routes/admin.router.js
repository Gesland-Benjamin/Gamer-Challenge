// This file defines the admin routes for the application using Express Router.
// It restricts access to admin-only pages and actions using the 'onlyAdmin' middleware.
// The routes are handled by methods from the AdminController.

import { Router } from "express";
import { onlyAdmin } from "../middlewares/auth.middleware.js";
import { AdminController } from "../controllers/index.js";

export const adminRouter = Router();

// Route to display the admin dashboard page (GET /admin)
adminRouter.get('/admin', onlyAdmin, AdminController.adminPage);

// Route to display the list of all users (GET /admin/userslist)
adminRouter.get('/admin/userslist', onlyAdmin, AdminController.getAll)

// Route to ban a user by ID (POST /admin/ban/:id)
adminRouter.post('/admin/ban/:id', onlyAdmin, AdminController.banUser)

// Route to unban a user by ID (POST /admin/unban/:id)
adminRouter.post('/admin/unban/:id', onlyAdmin, AdminController.unbanUser)