class FavoriteController {
    constructor(favoriteService) {
      this.favoriteService = favoriteService;
    }
  
    async addFavorite(req, res) {
      try {
        await this.favoriteService.addFavorite(req.user.email, req.body);
        res.status(201).send();
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    }
  
    async getFavorites(req, res) {
      try {
        const favorites = await this.favoriteService.getFavorites(req.user.email);
        res.json(favorites);
      } catch (err) {
        res.status(500).json({ error: 'Error fetching favorites' });
      }
    }
  }
  module.exports = FavoriteController;