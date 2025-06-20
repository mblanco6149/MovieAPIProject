const axios = require('axios');
const config = require('../config/config');

class MovieService {
    async searchMovies(keyword = '') {
      const response = await axios.get(config.tmdbApiUrl, {
        params: {
          api_key: config.tmdbApiKey,
          query: keyword
        }
      });
  
      const movies = response.data.results.map(m => ({
        id: m.id,
        title: m.title,
        overview: m.overview,
        release_date: m.release_date,
        suggestionScore: Math.floor(Math.random() * 100)
      }));
  
      return movies.sort((a, b) => b.suggestionScore - a.suggestionScore);
    }
}
module.exports = MovieService;
