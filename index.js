'use strict';

const env = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./logger/db');
const bot = require('./logger/telegram');
const setup = require('./setup');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.all('*', (req, res, next) => {
  console.log('Access!');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello Donatelo Logger!');
});

app.get('/dump', async (req, res) => {
  let logs = await db.getLogs();
  res.json(logs);
});

app.post('/issue', async (req, res) => {
  let log = await db.addLog(req.body.label, req.body.type, req.body.msg);
  bot.notify(log);
});

app.listen(setup.port);
console.log(`Running donatelo-logger on ${setup.port} port`);
