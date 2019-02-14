const displayChatList = function(chatMates) {
  const chatListDiv = document.getElementById('chats_register');
  const chatMatesHtml = convertChatListToHtml(chatMates);
  appendChildren(chatListDiv, chatMatesHtml);
};

const convertMessagesToHtml = function(messages) {
  const messagesHtml = messages.map(message => {
    const messageDetailsDiv = createDiv(
      'message_details_div',
      'message_details_div'
    );
    const senderDiv = createDiv('sender_div', 'sender_div', message.sender);
    const messageDiv = createDiv(
      'message_div',
      'smessage_div',
      message.message
    );
    appendChildren(messageDetailsDiv, [senderDiv, messageDiv]);

    return messageDetailsDiv;
  });
  return messagesHtml;
};

const displayName = function(name) {
  const chatMateNameDiv = document.getElementById('name_div');
  chatMateNameDiv.innerText = name;
};

const displayChat = function(chatMessages) {
  const chatDisplayDiv = document.getElementById('chat_display_div');
  const chatMessagesHtml = convertMessagesToHtml(chatMessages);
  appendChildren(chatDisplayDiv, chatMessagesHtml);
};

const convertChatListToHtml = function(chatList) {
  const htmlList = chatList.map(mate => {
    const nameDiv = createDiv('chat_mate_name', mate, mate);
    nameDiv.onclick = getChat.bind(null, mate);
    return nameDiv;
  });
  return htmlList;
};

const handleKeypress = () => {
  if (event.key == 'Enter') {
    sendMessage();
  }
};

window.onload = () => {
  const messageBox = document.getElementById('message_box');
  messageBox.onkeypress = handleKeypress;
  document.getElementById('send_button').onclick = sendMessage;
  document.getElementById('name_div').value = getUsername();
  setInterval(() => {
    messageBox.focus();
    getChatList();
    const name = document.getElementById('name_div').innerText;
    getChat(name);
  }, 1000);
};
