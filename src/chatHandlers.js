const getCurrentUser = function(cache, cookie) {
  return cache.sessions[cookie];
};

const isValidSession = function(cookie, cache) {
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
  const chat = cache.users.users[username].chats[mate] || {};
  res.send(chat);
};

module.exports = {
  checkForUser,
  renderChatList,
  renderChat
};
