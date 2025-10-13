import { CoreController } from "./core.controller.js";
import { Challenge, User } from "../models/index.js";

// LikeController handles the logic for toggling likes (votes) on challenges
export class LikeController extends CoreController {
  // Toggle like/unlike for a challenge by the current user
  async toggleLike(req, res) {
    try {
      const challengeId = req.params.id;
      const userId = req.session.userId || 1; // ⚠️ Remove default 1 in production

      const challenge = await Challenge.findByPk(challengeId);
      if (!challenge) {
        return res.status(404).json({ success: false, error: "Challenge introuvable" });
      }

      // Check if the user has already voted
      const hasVoted = await challenge.hasChallenge_voter(userId);

      let action;
      if (hasVoted) {
        // Remove the vote
        await challenge.removeChallenge_voter(userId);
        action = "removed";
      } else {
        // Add the vote
        await challenge.addChallenge_voter(userId);
        action = "added";
      }

      // Recalculate the total votes
      const votes = await challenge.countChallenge_voters();

      return res.json({ success: true, votes, action });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: "Erreur serveur" });
    }
  }
}

export default new LikeController();
