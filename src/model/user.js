class User {
  constructor(userDetails) {
    this.username = userDetails.username;
    this.password = userDetails.password;
    this.chats = userDetails.chats;
  }
  saveMessage(chatMate, message) {
    this.chats[chatMate].push(message);
  }

  getChats(chatMate) {
    return chats[chatMate];
  }
}

module.exports = User;
