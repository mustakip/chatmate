const displayChatList = function(chatMates) {
  const chatListDiv = document.getElementById('chats_register');
  const chatMatesHtml = convertToHtml(chatMates);
  appendChildren(chatListDiv, chatMatesHtml);
};

const getChat = function(name) {
  fetch('/chat', {
    method: 'POST',
    body: name
  })
    .then(res => res.json())
    .then(chatMessages => {
      displayChat(chatMessages);
    });
};

const convertMessagesToHtml = function(messages) {
  const messagesHtml = messages.map(message => {
    messageDiv = createDiv('message_div', 'message_div', message.message);
    return messageDiv;
  });
  return messagesHtml;
};

const displayChat = function(chatMessages) {
  const chatDisplayDiv = document.getElementById('chat_display_div');
  const chatMessagesHtml = convertMessagesToHtml(chatMessages);
  appendChildren(chatDisplayDiv, chatMessagesHtml);
};

const appendChildren = function(parent, children) {
  console.log('divs are ', children);
  parent.innerHTML = '';
  children.forEach(child => {
    parent.appendChild(child);
  });
};

const convertToHtml = function(list) {
  const htmlList = list.map(mate => {
    const nameDiv = createDiv('chat_mate_name', mate, mate);
    nameDiv.onclick = getChat.bind(null, mate);
    return nameDiv;
  });
  return htmlList;
};

const createDiv = function(className, id, innerHTML) {
  const divElement = document.createElement('div');
  divElement.id = id;
  divElement.className = className;
  divElement.innerHTML = innerHTML;
  return divElement;
};

const getChatList = function() {
  fetch('/chatList')
    .then(res => res.json())
    .then(chatMates => {
      displayChatList(chatMates);
    });
};

window.onload = () => {
  getChatList();
};
