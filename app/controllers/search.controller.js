import { Op } from 'sequelize';
import { Game, Challenge, User } from '../models/index.js';
import { CoreController } from './index.js';

// SearchController handles search logic for games, challenges, and users
class SearchController extends CoreController {
  // Handle search requests and render results based on type (games, challenges, users, or all)
  search = async (req, res) => {
  try {
    const { q, type } = req.query; // Get query and filter type
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
        // If no type or invalid type, search everywhere
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