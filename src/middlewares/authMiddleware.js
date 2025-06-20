const jwt = require('jsonwebtoken');
const config = require('../config/config');

function authMiddleware(revokedTokenRepository) {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Missing token' });
    const token = authHeader.split(' ')[1];
    try {
      const revoked = await revokedTokenRepository.isTokenRevoked(token);
      if (revoked) return res.status(401).json({ error: 'Token revoked' });
      const payload = jwt.verify(token, config.jwtSecret);
      req.user = payload;
      next();
    } catch {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
}

module.exports = authMiddleware;
