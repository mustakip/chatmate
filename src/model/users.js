const User = require('./user');
class Users {
  constructor(users = {}) {
    this.users = users;
  }

  isValidUser(username, password) {
    return this.users[username] && this.users[username].password === password;
  }

  addUser({username, password}) {
    const chats = {};
    this.users[username] = new User({username, password, chats});
  }
}
module.exports = Users;
