require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  tmdbApiKey: process.env.TMDB_API_KEY,
  tmdbApiUrl: 'https://api.themoviedb.org/3/search/movie',
  jwtSecret: process.env.JWT_SECRET || 'secretKey',
  revokedTokensFile: './revokedTokens.json'
};