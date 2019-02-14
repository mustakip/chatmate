const Users = require('../src/model/users');
const User = require('../src/model/user');
const expect = require('chai').expect;

describe('Users', function() {
  let users;
  beforeEach(() => {
    const userDetails = {
      username: 'username',
      password: 'password',
      chats: {}
    };

    const user1 = new User(userDetails);
    users = new Users({user1});
  });

  it('should create object of property users equals empty object when no args passed', function() {
    const users = new Users();

    expect(users)
      .to.have.property('users')
      .to.deep.equals({});
  });

  it('should create object of property users equals to objects of users passed in as args', function() {
    const actualOutput = users;
    const expectedOutput = {
      users: {user1: {username: 'username', password: 'password', chats: {}}}
    };

    expect(actualOutput).to.deep.equals(expectedOutput);
  });

  it('should return true if the username and password is valid', function() {
    const actualOutput = users.isValidUser('user1', 'password');
    const expectedOutput = true;

    expect(actualOutput).equals(expectedOutput);
  });

  it('should return false if the username is invalid', function() {
    const actualOutput = users.isValidUser('invalid', 'password');
    const expectedOutput = undefined;

    expect(actualOutput).equals(expectedOutput);
  });

  it('should return false if the password is invalid', function() {
    const actualOutput = users.isValidUser('user1', 'pass');
    const expectedOutput = false;

    expect(actualOutput).equals(expectedOutput);
  });

  it('should add a given user to the users object when addUser() is called', function() {
    users.addUser('user2', 'password2');

    expect(users)
      .to.have.property('users')
      .to.have.property('user2')
      .to.deep.equal({username: 'user2', password: 'password2', chats: {}});
  });

  it('should save the given message in both senders and receivers chats provided', function() {
    users.addUser('user2', 'password2');
    const message = {sender: 'user1', receiver: 'user2', message: 'message'};

    users.setupChatBetween('user1', 'user2');
    users.saveMessage('user1', 'user2', message);

    expect(users)
      .to.have.property('users')
      .to.have.property('user1')
      .to.have.property('chats')
      .to.have.property('user2')
      .to.be.an('Array')
      .deep.equals([{sender: 'user1', receiver: 'user2', message: 'message'}]);

      expect(users)
        .to.have.property('users')
        .to.have.property('user2')
        .to.have.property('chats')
        .to.have.property('user1')
        .to.be.an('Array')
        .deep.equals([{sender: 'user1', receiver: 'user2', message: 'message'}]);
  });
});
