const fs = require('fs');
const {createKeyValue} = require('./utils');

const redirectTo = function(res, location) {
  res.status(302);
  res.setHeader('Location', location);
  res.end();
};

const addUser = function(username, password, cache) {
  console.log('while adding users', cache.users);
  cache.users.addUser(username, password);
  fs.writeFile('./private/users.json', JSON.stringify(cache.users), () => {});
};

const isAlreadyExists = function(username, cache) {
  console.log('users are', cache.users);

  return cache.users.users[username];
};

const createUser = function(cache, req, res) {
  const {username, password} = createKeyValue(req.body);
  if (isAlreadyExists(username, cache))
    return redirectTo(res, '/html/signup.html');
  addUser(username, password, cache);
  redirectTo(res, '/html/login.html');
};

module.exports = {createUser};
