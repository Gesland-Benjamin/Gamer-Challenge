import multer from "multer";
import { CoreController } from "./index.js";
import { VideoSubmit, User, Challenge } from "../models/index.js";
import { addVideoSchema } from "../schemas/index.js";
import Joi from "joi";

class VideoController extends CoreController {

  formAddVideo = async (req, res) => {
    const challengeId = req.params.id;
    const challenge = await Challenge.findByPk(challengeId);
    if (!challenge) {
      return this.render404(req, res);
    }
    res.render('addVideo', { challenge });
  }

  uploadVideo = async (req, res) => {
    try {
      const data = Joi.attempt(req.body, addVideoSchema);
      const newVideo = await VideoSubmit.create(data);
      
      // Transforme l'URL en format embed si nécessaire
      const videoUrl = newVideo.url;
      const embedUrl = videoUrl.includes("watch?v=") ? videoUrl.replace("watch?v=", "embed/") : videoUrl;
      newVideo.url = embedUrl;
      console.log(req.session.user);
      newVideo.user_id = req.session.user.id;
      newVideo.challenge_id = req.params.id;
      await newVideo.save();
      
      res.status(201).redirect(`/challenges/${newVideo.challenge_id}`);
    } catch (error) {
      console.error(error);
      res.status(400).render("error", { error });
    }
  };

}

export default new VideoController();
