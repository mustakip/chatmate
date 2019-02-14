class User {
  constructor(userDetails) {
    this.username = userDetails.username;
    this.password = userDetails.password;
    this.chats = userDetails.chats;
  }
  saveMessage(chatMate, message) {
    this.chats[chatMate].push(message);
  }

  setupChatWith(chatMate) {
    this.chats[chatMate] = [];
  }

  getChats(chatMate) {
    return chats[chatMate];
  }
}

module.exports = User;
