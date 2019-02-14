const appendChildren = function(parent, children) {
  parent.innerHTML = '';
  children.forEach(child => {
    parent.appendChild(child);
  });
};

const createDiv = function(className, id, content) {
  const divElement = document.createElement('div');
  divElement.id = id;
  divElement.className = className;
  divElement.innerText = content;
  return divElement;
};
