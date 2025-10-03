import { CoreController } from "./core.controller.js";
import { Challenge, User } from "../models/index.js";

export class LikeController extends CoreController {
  async toggleLike(req, res) {
    try {
      const challengeId = req.params.id;
      const userId = req.session.userId || 1; // ⚠️ Enlever le 1 en production

      const challenge = await Challenge.findByPk(challengeId);
      if (!challenge) {
        return res.status(404).json({ success: false, error: "Challenge introuvable" });
      }

      // Vérifie si l'utilisateur a déjà voté
      const hasVoted = await challenge.hasChallenge_voter(userId);

      let action;
      if (hasVoted) {
        // Retire le vote
        await challenge.removeChallenge_voter(userId);
        action = "removed";
      } else {
        // Ajoute le vote
        await challenge.addChallenge_voter(userId);
        action = "added";
      }

      // Recalcule le total des votes
      const votes = await challenge.countChallenge_voters();

      return res.json({ success: true, votes, action });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: "Erreur serveur" });
    }
  }
}

export default new LikeController();
