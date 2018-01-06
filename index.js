'use strict';

const env = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const RateLimit = require('express-rate-limit');

const bot = require('./logger/telegram');
const db = require('./logger/db');
const setup = require('./setup');

const app = express();
const notifyLimiter = new RateLimit({
  windowMs: setup.notifyPerMinute*60*1000,
  max: 1,
  delayMs: 0
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.enable('trust proxy');

app.get('/', (req, res) => {
  res.send(setup.startMessage);
});

app.post('/find', async (req, res) => {
  let logs = await db.findLogs(req.body.query);
  res.json(logs);
});

app.get('/dump', async (req, res) => {
  let buffer = await db.getDump();
  res.write(buffer,'binary');
  res.end(null, 'binary');
});

app.use('/issue', notifyLimiter);
app.post('/issue', async (req, res) => {
  let log = await db.addLog(req.body.label, req.body.type, req.body.msg, req.body.db);
  bot.notify(log);
  res.send('OK');
});

app.listen(setup.port);
console.log(`Running donatelo-logger on ${setup.port} port`);
