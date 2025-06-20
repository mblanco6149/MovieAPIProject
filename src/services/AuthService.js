const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');

class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async register({ email, firstName, lastName, password }) {
    const existing = await this.userRepository.getUserByEmail(email);
    if (existing) throw new Error('User already exists');
    const hash = await bcrypt.hash(password, 10);
    const user = new User(email, firstName, lastName, hash);
    await this.userRepository.addUser(user);
  }

  async login({ email, password }) {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) throw new Error('User not found');
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) throw new Error('Invalid password');
    const token = jwt.sign({ email: user.email }, config.jwtSecret, { expiresIn: '1h' });
    return token;
  }
}
module.exports = AuthService;
