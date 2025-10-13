// CoreController provides common error rendering methods for all controllers
export class CoreController {
  // Render a 404 Not Found error page
  render404(req, res) {
    res.status(404).render("error", { errorCode: 404, message: "Page non trouvée" });
  };
  // Render a 400 Bad Request error page
  render400(req, res) {
    res.status(400).render("error", { errorCode: 400, message: "Requête incorrecte" });
  };
  // Render a 409 Conflict error page (e.g. user already exists)
  render409(req, res) {
    res.status(409).render("error", { errorCode: 409, message: "L'utilisateur existe déjà." });
  };
  // Render a 403 Forbidden error page
  render403(req, res) {
    res.status(403).render("error", { errorCode: 403, message: "Non autorisé" });
  };
  // Render a 401 Unauthorized error page
  render401(req, res) {
    res.status(401).render("error", { errorCode: 401, message: "Nom d'utilisateur ou mot de passe incorrect" });
  };
  // Render a 500 Internal Server Error page
  render500(req, res) {
    res.status(500).render("error", { errorCode: 500, message: "Erreur interne du serveur" });
  };
}


