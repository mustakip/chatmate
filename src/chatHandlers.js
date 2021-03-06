const {isValidSession} = require('./utils');
const fs = require('fs');
const getCurrentUser = function(cache, cookie) {
  return cache.sessions[cookie];
};

const checkForUser = function(cache, req, res, next) {
  const cookie = req.cookies.session;
  if (isValidSession(cookie, cache)) {
    req.username = getCurrentUser(cache, cookie);
  }
  next();
};

const renderChatList = function(cache, req, res) {
  const chatMates = Object.keys(cache.users.users);
  res.send(chatMates);
};

const renderChat = function(cache, req, res) {
  const mate = req.body;
  const username = req.username;
  const chat = cache.users.users[username].chats[mate] || [];
  res.send(chat);
};

const isANewFriend = function(cache, sender, receiver) {
  return !(
    cache.users.users[sender].chats[receiver] &&
    cache.users.users[receiver].chats[sender]
  );
};

const sendMessage = function(cache, req, res) {
  const {receiver, message} = JSON.parse(req.body);
  const sender = req.username;
  if (isANewFriend(cache, receiver, sender)) {
    cache.users.setupChatBetween(sender, receiver);
  }
  cache.users.saveMessage(sender, receiver, message);
  fs.writeFile('./private/users.json', JSON.stringify(cache.users), () => {});
  res.send(cache.users.users[req.username].chats[receiver]);
};

const renderUsername = function(cache, req, res) {
  res.send(req.username);
};

module.exports = {
  checkForUser,
  renderChatList,
  renderChat,
  sendMessage,
  renderUsername
};
