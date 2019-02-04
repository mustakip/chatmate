const fs = require('fs');
const Users = require('./model/users');
const User = require('./model/user');


const retainMethods = function(users) {
  const retainedUsers = new Users(users.users);
  const userIds = Object.keys(retainedUsers.users);
  userIds.forEach(userid => {
    const retainedUser = new User(retainedUsers.users[userid]);
    retainedUsers.users[userid] = retainedUser;
  });
  return retainedUsers;
};

const getUsers = function() {
  const users = JSON.parse(fs.readFileSync('./private/users.json', 'utf8'));
  return retainMethods(users);
};

const getSessions = function() {
  return JSON.parse(fs.readFileSync('./private/sessions.json', 'utf8'));
};

const initialiseCache = function() {
  const users = getUsers();
  const sessions = getSessions();
  return {users, sessions};
};

module.exports = {initialiseCache};
