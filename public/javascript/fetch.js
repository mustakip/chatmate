const getChatList = function() {
  doFetchRequest('/chatList', {}, displayChatList);
};

const getChat = function(name) {
  const headers = {method: 'POST', body: name};
  doFetchRequest('/chat', headers, displayChat);
  displayName(name);
};

const sendMessage = function() {
  const message = document.getElementById('message_box').value;
  const receiver = document.getElementById('name_div').innerText;
  const headers = {method: 'POST', body: JSON.stringify({receiver, message})};
  doFetchRequest('/sendMessage', headers, displayChat);
};

const getUsername = function() {
  // doFetchRequest('/username', {}, displayName);
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
