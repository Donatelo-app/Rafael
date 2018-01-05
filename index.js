'use strict';

const env = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const bot = require('./telegram');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.all('*', (req, res, next) {
  console.log('Access!');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello Donatelo Logger!');
});

app.get('/dump', (req, res) => {
  let logs = await db.getLogs();
  res.json(logs);
});

app.post('/issue', (req, res) => {
  let log = db.addLog(req.body.label, req.body.type, req.body.msg);
  bot.notify(log);
});

app.listen(8080);
console.log(`Running donatelo-logger on 8080 port`);
