class User {
    constructor(email, firstName, lastName, passwordHash) {
      this.email = email;
      this.firstName = firstName;
      this.lastName = lastName;
      this.passwordHash = passwordHash;
    }
  }
  
  module.exports = User;