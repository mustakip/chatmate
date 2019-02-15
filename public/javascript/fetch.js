const getChatList = function() {
  doFetchRequest('/chatList', {}, displayChatList);
};

const getChat = function(name) {
  const headers = {method: 'POST', body: name};
  doFetchRequest('/chat', headers, displayChat);
  displayName(name);
  const displayBox = document.getElementById('chat_display_div');
  displayBox.scrollTop = displayBox.scrollHeight;
};

const sendMessage = function() {
  const textBox = document.getElementById('message_box');
  const message = textBox.value;
  const receiver = document.getElementById('name_div').innerText;
  const headers = {method: 'POST', body: JSON.stringify({receiver, message})};
  if (message) {
    doFetchRequest('/sendMessage', headers, displayChat);
  }
  textBox.value = '';
};

const getUsername = function() {
  fetch('/username')
    .then(res => res.text())
    .then(name => displayName(name));
};

const doFetchRequest = function(url, headers, callback) {
  fetch(url, headers)
    .then(res => res.json())
    .then(content => {
      callback(content);
    });
};
