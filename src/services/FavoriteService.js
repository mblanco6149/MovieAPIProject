const Favorite = require('../models/Favorite');

class FavoriteService {
  constructor(favoriteRepository) {
    this.favoriteRepository = favoriteRepository;
  }

  async addFavorite(userEmail, movie) {
    const favorite = new Favorite(userEmail, movie, new Date().toISOString());
    await this.favoriteRepository.addFavorite(favorite);
  }

  async getFavorites(userEmail) {
    const favorites = await this.favoriteRepository.getFavoritesByUser(userEmail);
    return favorites.map(f => ({
      ...f.movie,
      addedAt: f.addedAt,
      suggestionForTodayScore: Math.floor(Math.random() * 100)
    })).sort((a, b) => b.suggestionForTodayScore - a.suggestionForTodayScore);
  }
}
module.exports = FavoriteService;
