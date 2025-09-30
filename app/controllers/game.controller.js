// Importe le modèle Game depuis les modèles
import { Game } from "../models/index.js"
import { errorController } from "./error.controller.js";
import { createGameschema } from "../schemas/game.schema.js";
import Joi from "joi";

class gameController extends errorController {

  gamesListPage = async (req, res) => {
    console.log(this);

    try {
      const listGames = await Game.findAll({
        order: [
          ["name", "ASC"]
        ]
      });
      res.status(200).render("games", { listGames });
    } catch (error) {
      console.error(error);
      res.status(404).render("error", { error });
    }
  };

  gameDetailsPage = async (req, res, next) => {
    try {
        
      const { id } = req.params;

      const game = await Game.findByPk(id);

      if (!game) {
        return this.render404(req, res);
      }

      res.render("game", { game });
    }
     catch (error) {
      console.error(error);
      res.status(404).render("error");
    }
  };

  addNewGame = async (req, res) => {
    try {

        const data = Joi.attempt(req.body, createGameschema);
        
        const newGame = await Game.create(data);

        res.status(201).redirect(`/games/${newGame.id}`);
        
    } catch (error) {
        console.error(error);
        res.status(400).render("error", { error });
    }
  };
}

//     // Afficher les détails d'un jeu 
//     async getById(req,res) {

//         // récupération de l'id dans la requête
//         const { id } = req.params;
        
//         // On vérifie que l'id du jeu est bien dans la BDD
//         const game = await Game.findByPk(id)

//         // Si le jeu n'existe pas, retourne une erreur 404
//         if (!game) {
//             return res.status(404).render({ error : "id is invalid."});
//         }

//         // Si ok on renvoie le jeu 
//         res.status(200).render("game", { game });

//     }

// }


// On exporte pas la classe, mais une instance de la classe...
// Pourquoi ? Parce que le router a besoin d'un objet prêt à l'emploi.
// On aurait pu continuer de retourner juste la classe en mettant des méthodes statics... Mais ça aurait été un peu dommage parce que :
// - Il aurait fallu penser à mettre le mot clé static sur toutes les fonctions
// - Alors que notre controller ne sera utilisé que par le router (donc pas besoin de créer plusieurs instances, juste celle du routeur)
export default new gameController();