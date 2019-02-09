const fs = require('fs');

const {isValidSession} = require('./utils');
const FILES_PATH = {
  homepage: './public/html/index.html'
};

const serveHomepage = function(cache, req, res) {
  fs.readFile(FILES_PATH.homepage, (err, content) => {
    res.setHeader('content-type', 'text/html');
    res.status(200).send(content);
  });
};

const logRequest = function(req, res, next) {
  console.log(req.method, req.url);
  next();
};

const readPostBody = function(req, res, next) {
  let content = '';
  req.on('data', chunk => (content += chunk));
  req.on('end', () => {
    req.body = content;
    next();
  });
};
const restrictedURLsWhenLoggedIn = [
  '/',
  '/html/index.html',
  '/html/login.html',
  '/html/signup.html'
];

const restrictedURLsWhenNotLoggedIn = [
  '/html/home.html',
  '/logout',
  '/javascript/fetch.js',
  '/javascript/htmlUtils.js',
  '/javascript/home.js',
  '/chat',
  '/chatList',
  '/username',
  '/sendMessage'
];

const redirect = function(cache, req, res, next) {
  const cookie = req.cookies.session;
  if (restrictedURLsWhenLoggedIn.includes(req.url)) {
    if (isValidSession(cookie, cache)) {
      return res.redirect('/html/home.html');
    }
  }
  if (restrictedURLsWhenNotLoggedIn.includes(req.url)) {
    if (!isValidSession(cookie, cache)) {
      return res.redirect('/html/index.html');
    }
  }
  next();
};

module.exports = {
  readPostBody,
  logRequest,
  redirect,
  serveHomepage
};
