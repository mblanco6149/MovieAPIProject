class AuthController {
    constructor(authService, revokedTokenRepository) {
      this.authService = authService;
      this.revokedTokenRepository = revokedTokenRepository;
    }
  
    async register(req, res) {
      try {
        await this.authService.register(req.body);
        res.status(201).send();
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    }
  
    async login(req, res) {
      try {
        const token = await this.authService.login(req.body);
        res.json({ token });
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    }
  
    async logout(req, res) {
      const authHeader = req.headers.authorization;
      if (!authHeader) return res.status(400).json({ error: 'Missing token' });
      const token = authHeader.split(' ')[1];
      await this.revokedTokenRepository.revokeToken(token);
      res.status(200).json({ message: 'Logged out' });
    }
  }
  module.exports = AuthController;