const createKeyValue = function(text) {
  const keyValuePair = new Object();
  const splittedText = text.split('&').map(pair => pair.split('='));
  const assignKeyValue = ([key, value]) =>
    (keyValuePair[key] = decodeURI(value));
  splittedText.forEach(assignKeyValue);
  return keyValuePair;
};

const isValidSession = function(cookie, cache) {
  return cache.sessions[cookie];
};

module.exports = {
  createKeyValue,
  isValidSession
};
