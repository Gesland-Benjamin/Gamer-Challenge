// This file defines the contact routes for the application using Express Router.
// It handles displaying the contact form page via the ContactController.

import { Router } from "express";
import { ContactController } from "../controllers/index.js";

// Create a router instance for contact routes
export const contactRouter = Router();

// Route to display the contact form page (GET /contact)
contactRouter.get('/contact', ContactController.contactFormPage);

