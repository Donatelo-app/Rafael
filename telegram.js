'use strict';

const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

// emoji
const TYPES = {
  "LOG": "✉️",
  "ERROR": "❗️",
  "WARNING": "⚠️",
  "NULL": "❓"
}

bot.onText(/\/start/, (msg) => {
	bot.sendMessage(msg.chat.id, 'Hello! I\'m Donatelo Logger and i can notify you about errors, cool? Cool.');
});

bot.onText(/\/dump/, (msg) => {
	bot.sendMessage(msg.chat.id, 'Okay, logs dump from all time there: ');
});

module.exports.notify = (log) => {
  bot.sendMessage(msg.chat.id, `${TYPES[log.type] || TYPES.NULL} ${log.label}`);
}
