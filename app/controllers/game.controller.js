 import { Game } from "../models/index.js"
 
 export const gameController = {

    // Afficher tous les jeux 
    async getAll(req, res) {

        const listGames = await Game.findAll({
            order: [
                ["position", "ASC"]
            ]
        });

    }

}