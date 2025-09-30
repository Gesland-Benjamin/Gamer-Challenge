export class errorController {
  render404(req, res) {
    res.status(404).render("pages/error", { errorCode: 404, message: "Page non trouvée" });
  }
}


