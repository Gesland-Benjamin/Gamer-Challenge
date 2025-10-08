import { Router } from "express";
import { onlyAdmin } from "../middlewares/auth.middleware.js";
import { AdminController } from "../controllers/index.js";

export const adminRouter = Router();

adminRouter.get('/admin', onlyAdmin, AdminController.adminPage);

adminRouter.get('/admin/userslist', onlyAdmin, AdminController.getAll)

adminRouter.post('/admin/ban/:id', onlyAdmin, AdminController.banUser)

adminRouter.post('/admin/unban/:id', onlyAdmin, AdminController.unbanUser)