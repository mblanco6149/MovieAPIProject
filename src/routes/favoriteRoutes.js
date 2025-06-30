const express = require('express');

module.exports = (favoriteController) => {
  const router = express.Router();

  router.post('/', (req, res) => favoriteController.addFavorite(req, res));
  router.get('/', (req, res) => favoriteController.getFavorites(req, res));

  return router;
};

/* function favoriteRoutes(favoriteService) {
  const router = express.Router();

  router.post('/', async (req, res) => {
    try {
      await favoriteService.addFavorite(req.user.email, req.body);
      res.status(201).send();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  router.get('/', async (req, res) => {
    try {
      const favorites = await favoriteService.getFavorites(req.user.email);
      res.json(favorites);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching favorites' });
    }
  });

  return router;
}
module.exports = favoriteRoutes; */