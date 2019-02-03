class Users {
  constructor(users = {}) {
    this.users = users;
  }

  isValidUser(username, password) {
    return users[username] && users[username].password === password;
  }
}

module.exports = Users;
