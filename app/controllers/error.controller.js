export class errorController {
  render404(req, res) {
    res.status(404).render("error", { errorCode: 404, message: "Page non trouvée" });
  };
  render400(req, res) {
    res.status(400).render("error", { errorCode: 400, message: "Requête incorrecte" });
  }
}


