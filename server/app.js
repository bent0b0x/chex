var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.resolve('client')));

app.get('*', function(req, res) {
  res.sendFile(path.resolve('client/index.html'));
});

app.listen(3000);