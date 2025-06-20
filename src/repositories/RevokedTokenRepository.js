const fs = require('fs/promises');

class RevokedTokenRepository {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async loadTokens() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async saveTokens(tokens) {
    await fs.writeFile(this.filePath, JSON.stringify(tokens, null, 2));
  }

  async revokeToken(token) {
    const tokens = await this.loadTokens();
    tokens.push(token);
    await this.saveTokens(tokens);
  }

  async isTokenRevoked(token) {
    const tokens = await this.loadTokens();
    return tokens.includes(token);
  }
}

module.exports = RevokedTokenRepository;