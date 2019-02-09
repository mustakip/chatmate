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
  console.log('chatmate are', chatMates);
  res.send(chatMates);
};

const renderChat = function(cache, req, res) {
  const mate = req.body;
  console.log(mate);
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
    cache.users.users[sender].chats[receiver] = [];
    cache.users.users[receiver].chats[sender] = [];
  }
  console.log('does it came into send message');
  console.log('sender is ', sender);
  console.log('receiver is ', receiver);
  cache.users.users[sender].chats[receiver].push({sender, receiver, message});
  cache.users.users[receiver].chats[sender].push({sender, receiver, message});
  fs.writeFile('./private/users.json', JSON.stringify(cache.users), () => {});
  res.send(cache.users.users[req.username].chats[receiver]);
};

const renderUsername = function(cache, req, res) {
  console.log('usename in server is ', req.username);
  res.send(req.username);
};

module.exports = {
  checkForUser,
  renderChatList,
  renderChat,
  sendMessage,
  renderUsername
};
