const fs = require('fs/promises');
const Favorite = require('../models/Favorite');

class FavoriteRepository {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async loadFavorites() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async saveFavorites(favorites) {
    await fs.writeFile(this.filePath, JSON.stringify(favorites, null, 2));
  }

  async addFavorite(favorite) {
    const favorites = await this.loadFavorites();
    favorites.push(favorite);
    await this.saveFavorites(favorites);
  }

  async getFavoritesByUser(email) {
    const favorites = await this.loadFavorites();
    return favorites.filter(f => f.userEmail === email);
  }
}

module.exports = FavoriteRepository;