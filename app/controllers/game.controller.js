// Importe le modèle Game depuis les modèles
import { Game } from "../models/index.js"
 
// Définition du contrôleur de jeu
export const gameController = {

    // Afficher tous les jeux 
    async getAll(req, res) {
        // Récupère tous les jeux, triés par nom (ordre croissant)
        const listGames = await Game.findAll({
            order: [
                ["name", "ASC"]
            ]
        });

        // Affiche la vue "game" avec la liste des jeux
        res.render("games", { listGames })
    },

    // Afficher les détails d'un jeu 
    async getById(req,res) {

        // récupération de l'id dans la requête
        const { id } = req.params;
        
        // On vérifie que l'id du jeu est bien dans la BDD
        const game = await Game.findByPk(id)

        // Si le jeu n'existe pas, retourne une erreur 404
        if (!game) {
            return res.status(404).render({ error : "id is invalid."});
        }

        // Si ok on renvoie le jeu 
        res.status(200).render("game", { game });

    }

}