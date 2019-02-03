const fs = require('fs');
const express = require('express');
const app = express();
const FILES_PATH = {
  homepage: './public/htmlPages/homepage.html'
};

const serveHomepage = function(req, res) {
  fs.readFile(FILES_PATH.homepage, (err, content) => {
    res.setHeader('content-type', 'text/html');
    res.status(200).send(200, content);
  });
};

app.use(express.static('public'));
app.get('/', serveHomepage);

module.exports = app;
