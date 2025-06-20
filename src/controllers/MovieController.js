class MovieController {
    constructor(movieService) {
      this.movieService = movieService;
    }
  
    async getMovies(req, res) {
      const keyword = req.query.keyword || '';
      try {
        const movies = await this.movieService.searchMovies(keyword);
        res.json(movies);
      } catch (err) {
        res.status(500).json({ error: 'Error fetching movies' });
      }
    }
  }
  module.exports = MovieController;