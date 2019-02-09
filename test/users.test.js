const Users = require('../src/model/users');
const User = require('../src/model/user');
const expect = require('chai').expect;

describe('Users', function() {
  describe('properties', function() {
    it('should create object of property users equals empty object when no args passed', function() {
      const users = new Users();

      expect(users)
        .to.have.property('users')
        .to.deep.equals({});
    });

    it('should create object of property users equals to objects of users passed in as args', function() {
      const userDetails = {
        username: 'username',
        password: 'password',
        chats: {}
      };

      const user1 = new User(userDetails);
      const inputUsers = {user1};
      const actualOutput = new Users(inputUsers);
      const expectedOutput = {
        users: {user1: {username: 'username', password: 'password', chats: {}}}
      };

      expect(actualOutput).to.deep.equals(expectedOutput);
    });
  });

  describe('isValidUser', function() {
    it('should return true if the username and password is valid', function() {
      const userDetails = {
        username: 'user1',
        password: 'password',
        chats: {}
      };

      const user1 = new User(userDetails);
      const users = new Users({user1});
      const actualOutput = users.isValidUser('user1', 'password');
      const expectedOutput = true;

      expect(actualOutput).equals(expectedOutput);
    });

    it('should return false if the username is invalid', function() {
      const userDetails = {
        username: 'user1',
        password: 'password',
        chats: {}
      };

      const user1 = new User(userDetails);
      const users = new Users({user1});
      const actualOutput = users.isValidUser('invalid', 'password');
      const expectedOutput = undefined;

      expect(actualOutput).equals(expectedOutput);
    });

    it('should return false if the password is invalid', function() {
      const userDetails = {
        username: 'user1',
        password: 'password',
        chats: {}
      };

      const user1 = new User(userDetails);
      const users = new Users({user1});
      const actualOutput = users.isValidUser('user1', 'pass');
      const expectedOutput = false;

      expect(actualOutput).equals(expectedOutput);
    });
  });
});
