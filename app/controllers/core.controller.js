export class CoreController {
  render404(req, res) {
    res.status(404).render("error", { errorCode: 404, message: "Page non trouvée" });
  };
  render400(req, res) {
    res.status(400).render("error", { errorCode: 400, message: "Requête incorrecte" });
  };
  render409(req, res) {
    res.status(409).render("error", { errorCode: 409, message: "L'utilisateur existe déjà." });
  };
  render403(req, res) {
    res.status(403).render("error", { errorCode: 403, message: "Non autorisé" });
  };
  render401(req, res) {
    res.status(401).render("error", { errorCode: 401, message: "Nom d'utilisateur ou mot de passe incorrect" });
  };
  render500(req, res) {
    res.status(500).render("error", { errorCode: 500, message: "Erreur interne du serveur" });
  };
}


