import { CoreController } from "./core.controller.js";

// ContactController handles the contact form page rendering
class ContactController extends CoreController {

    // Render the contact form page
    contactFormPage = (req, res) => {
        res.render("contact");
    };

}

export default new ContactController();
