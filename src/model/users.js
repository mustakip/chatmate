const User = require('./user');
class Users {
  constructor(users = {}) {
    this.users = users;
  }

  isValidUser(username, password) {
    return this.users[username] && this.users[username].password === password;
  }

  addUser(username, password) {
    const chats = {};
    this.users[username] = new User({username, password, chats});
  }

  saveMessage(sender, receiver, message) {
    const messageSender = this.users[sender];
    const messageReceiver = this.users[receiver];
    messageSender.saveMessage(receiver, message);
    messageReceiver.saveMessage(sender, message);
  }

  setupChatBetween(user1, user2) {
    this.users[user1].setupChatWith(user2);
    this.users[user2].setupChatWith(user1);
  }
}
module.exports = Users;
