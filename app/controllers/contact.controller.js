import { CoreController } from "./core.controller.js";

class ContactController extends CoreController {

    // Affiche le formulaire de contact
    contactFormPage = (req, res) => {
        res.render("contact");
    };

}

export default new ContactController();
