const fs = require('fs');
const FILES_PATH = {
  homepage: './public/html/index.html'
};

const serveHomepage = function(cache, req, res) {
  fs.readFile(FILES_PATH.homepage, (err, content) => {
    res.setHeader('content-type', 'text/html');
    res.status(200).send(content);
  });
};

const logRequest = function(req, res, next) {
  console.log(req.method, req.url);
  next();
};

const readPostBody = function(req, res, next) {
  let content = '';
  req.on('data', chunk => (content += chunk));
  req.on('end', () => {
    req.body = content;
    next();
  });
};

module.exports = {
  readPostBody,
  logRequest,
  serveHomepage
};
