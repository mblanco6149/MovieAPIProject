const fs = require('fs/promises');
const User = require('../models/User');

class UserRepository {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async loadUsers() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async saveUsers(users) {
    await fs.writeFile(this.filePath, JSON.stringify(users, null, 2));
  }

  async addUser(user) {
    const users = await this.loadUsers();
    users.push(user);
    await this.saveUsers(users);
  }

  async getUserByEmail(email) {
    const users = await this.loadUsers();
    return users.find(u => u.email === email);
  }
}

module.exports = UserRepository;