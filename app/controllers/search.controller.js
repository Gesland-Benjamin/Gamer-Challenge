import { Op } from 'sequelize';
import { Game, Challenge, User } from '../models/index.js';
import { CoreController } from './index.js';

class SearchController extends CoreController {
  // Méthode pour gérer la recherche
  search = async (req, res) => {
  try {
    const { q, type } = req.query; // récupération de la query et du filtre
    let results = [];

    if (!q || q.trim() === '') {
      return res.render('search', { results, query: '', type: '' });
    }

    switch (type) {
      case 'games':
        results = await Game.findAll({
          where: { name: { [Op.iLike]: `%${q}%` } }
        });
        break;

      case 'challenges':
        results = await Challenge.findAll({
          where: { name: { [Op.iLike]: `%${q}%` } }
          //rajouter picture plus tard
        });
        
        break;

        case 'users':
          results = await User.findAll({
            where: {
              username: { [Op.iLike]: `%${q}%` }
            },
           attributes: ['id', 'username'] // Sélectionne uniquement les champs nécessaires
          });
          break;

      default:
        // Si aucun type ou type invalide → chercher partout
        const games = await Game.findAll({ where: { name: { [Op.iLike]: `%${q}%` } } });
        const challenges = await Challenge.findAll({ where: { name: { [Op.iLike]: `%${q}%` } } });
        const users = await User.findAll({ where: { username: { [Op.iLike]: `%${q}%` } } });
        
        results = { games, challenges, users };
         
    }

    res.render('search', { results, query: q, type });
  } catch (err) {
    console.error('Erreur recherche :', err);
    return this.render500(req, res);
  }
};
}

export default new SearchController();