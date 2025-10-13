import multer from "multer";
import { CoreController } from "./index.js";
import { VideoSubmit, User, Challenge } from "../models/index.js";
import { addVideoSchema } from "../schemas/index.js";
import Joi from "joi";

// VideoController handles video upload and association with challenges
class VideoController extends CoreController {

  // Render the form to add a new video to a challenge
  formAddVideo = async (req, res) => {
    const challengeId = req.params.id;
    const challenge = await Challenge.findByPk(challengeId);
    if (!challenge) {
      return this.render404(req, res);
    }
    res.render('addVideo', { challenge });
  }

  // Handle the upload and saving of a new video
  uploadVideo = async (req, res) => {
    try {
      // Validate video data
      const data = Joi.attempt(req.body, addVideoSchema);
      // Create the video entry
      const newVideo = await VideoSubmit.create(data);
      // Transform the URL to embed format if needed
      const videoUrl = newVideo.url;
      const embedUrl = videoUrl.includes("watch?v=") ? videoUrl.replace("watch?v=", "embed/") : videoUrl;
      newVideo.url = embedUrl;
      // Associate video with user and challenge
      newVideo.user_id = req.session.user.id;
      newVideo.challenge_id = req.params.id;
      await newVideo.save();
      res.status(201).redirect(`/challenges/${newVideo.challenge_id}`);
    } catch (error) {
      console.error(error);
      return this.render404(req, res);
    }
  };

}

export default new VideoController();
