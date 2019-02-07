const appendChildren = function(parent, children) {
  console.log('divs are ', children);
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
