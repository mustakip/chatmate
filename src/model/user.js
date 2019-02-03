class User {
  constructor(name, password, chats = {}) {
    this.name = name;
    this.password = password;
    this.chats = chats;
  }
  saveMessage(chatMate, message) {
    this.chats[chatMate].push(message);
  }

  getChats(chatMate) {
    return chats[chatMate];
  }
}

module.exports = User;
