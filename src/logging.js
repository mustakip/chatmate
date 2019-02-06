const fs = require('fs');
const {
  INTERNAL_SERVER_ERROR,
  SESSIONS_PATH,
  UTF8,
  HOME_PAGE,
  LOGIN_PAGE
} = require('./constants');
const {createKeyValue} = require('./utils');

const addSession = function(cache, username, cookie) {
  cache.sessions[cookie] = username;
  fs.writeFileSync(SESSIONS_PATH, JSON.stringify(cache.sessions), UTF8);
};

const renderHome = function(cache, username, res) {
  const cookie = new Date().getTime();
  addSession(cache, username, cookie);
  res.setHeader('Set-Cookie', `session=${cookie}`);
  res.redirect(HOME_PAGE);
};

const loginHandler = function(cache, req, res) {
  const {username, password} = createKeyValue(req.body);
  if (cache.users.isValidUser(username, password))
    return renderHome(cache, username, res);
  res.redirect(LOGIN_PAGE);
};

const writeFile = function(res, path, content) {
  fs.writeFile(path, content, err => {
    if (err) res.send(INTERNAL_SERVER_ERROR);
  });
};

const deleteSession = function(cache, req, res) {
  const sessionId = req.cookies.session;
  delete cache.sessions[sessionId];
  writeFile(res, SESSIONS_PATH, JSON.stringify(cache.sessions));
};

const logoutHandler = function(cache, req, res) {
  deleteSession(cache, req, res);
  res.clearCookie('session');
  res.redirect('/');
};

module.exports = {
  loginHandler,
  logoutHandler
};
