const express = require('express');
const { body, validationResult } = require('express-validator');


module.exports = (authController) => {
  const router = express.Router();

  router.post('/register',
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
      authController.register(req, res);
    }
  );

  router.post('/login', async (req, res) => {
    authController.login(req, res);
  });

  router.post('/logout', async (req, res) => {
    authController.logout(req, res);
  });

  return router;

};


/* }
function authRoutes(authService, revokedTokenRepository) {
  const router = express.Router();

  router.post('/register',
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
      try {
        await authService.register(req.body);
        res.status(201).send();
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    }
  );

  router.post('/login', async (req, res) => {
    try {
      const token = await authService.login(req.body);
      res.json({ token });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  router.post('/logout', async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(400).json({ error: 'Missing token' });
    const token = authHeader.split(' ')[1];
    await revokedTokenRepository.revokeToken(token);
    res.status(200).json({ message: 'Logged out' });
  });

  return router;
}
module.exports = authRoutes; */