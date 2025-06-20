const express = require('express');

function movieRoutes(movieService) {
  const router = express.Router();

  router.get('/', async (req, res) => {
    const keyword = req.query.keyword || '';
    try {
      const movies = await movieService.searchMovies(keyword);
      res.json(movies);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching movies' });
    }
  });

  return router;
}
module.exports = movieRoutes;
