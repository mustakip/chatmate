const appendChildren = function(parent, children) {
  parent.innerHTML = '';
  children.forEach(child => {
    parent.appendChild(child);
  });
};

const createDiv = function(className, id, innerHTML) {
  const divElement = document.createElement('div');
  divElement.id = id;
  divElement.className = className;
  divElement.innerHTML = innerHTML;
  return divElement;
};
