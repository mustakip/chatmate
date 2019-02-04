const User = require('./user');
class Users {
  constructor(users = {}) {
    this.users = users;
  }

  isValidUser(username, password) {
    return users[username] && users[username].password === password;
  }

  addUser({username, password}) {
    const chats = {};
    this.users[username] = new User({username, password, chats});
  }
}
module.exports = Users;
