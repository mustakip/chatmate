const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const {readPostBody, logRequest, serveHomepage} = require('./handlers');
const {createUser} = require('./signup');
const {loginHandler, logoutHandler} = require('./logging');
const {initialiseCache} = require('./cache');
const {checkForUser, renderChatList, renderChat} = require('./chatHandlers');

const cache = initialiseCache();

app.use(logRequest);
app.use(readPostBody);
app.use(cookieParser());
app.use(checkForUser.bind(null, cache));
app.get('/', serveHomepage.bind(null, cache));
app.post('/signup', createUser.bind(null, cache));
app.post('/login', loginHandler.bind(null, cache));
app.post('/logout', logoutHandler.bind(null, cache));
app.post('/chat', renderChat.bind(null, cache));
app.get('/chatList', renderChatList.bind(null, cache));
app.use(express.static('public'));

module.exports = app;
