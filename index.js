'use strict';

const express = require('express');

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello world\n');
});

app.listen(8080);
console.log(`Running donatelo-logger on 8080 port`);
