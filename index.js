const express = require('express');
const cors = require('cors');
const config = require('./src/config/config');

const UserRepository = require('./src/repositories/UserRepository');
const FavoriteRepository = require('./src/repositories/FavoriteRepository');
const RevokedTokenRepository = require('./src/repositories/RevokedTokenRepository');

const AuthService = require('./src/services/AuthService');
const MovieService = require('./src/services/MovieService');
const FavoriteService = require('./src/services/FavoriteService');

const AuthController = require('./src/controllers/AuthController');
const MovieController = require('./src/controllers/MovieController');
const FavoriteController = require('./src/controllers/FavoriteController');

const authRoutes = require('./src/routes/authRoutes');
const movieRoutes = require('./src/routes/movieRoutes');
const favoriteRoutes = require('./src/routes/favoriteRoutes');

const authMiddleware = require('./src/middlewares/authMiddleware');

const app = express();
app.use(cors());
app.use(express.json());

const userRepo = new UserRepository('./users.json');
const favoriteRepo = new FavoriteRepository('./favorites.json');
const revokedTokenRepo = new RevokedTokenRepository(config.revokedTokensFile);

const authService = new AuthService(userRepo);
const movieService = new MovieService();
const favoriteService = new FavoriteService(favoriteRepo);

const authController = new AuthController(authService, revokedTokenRepo);
const movieController = new MovieController(movieService);
const favoriteController = new FavoriteController(favoriteService);

app.use('/api/auth', authRoutes(authController));
app.use('/api/movies', authMiddleware(revokedTokenRepo), movieRoutes(movieController));
app.use('/api/favorites', authMiddleware(revokedTokenRepo), favoriteRoutes(favoriteController));

if (process.env.NODE_ENV !== 'test') {
  app.listen(config.port, () => console.log(`Server running on port ${config.port}`));
}
module.exports = app;
