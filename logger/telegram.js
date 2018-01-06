'use strict';

const dateFormat = require('dateformat');
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true, filepath: false });
const setup = require('../setup');
const db = require('./db');

const users = process.env.USERS.replace(' ', '').split(';');
const checkAccess = (id) => {
	let isAccess = users.find((user) => user === id);
	if(!isAccess) bot.sendMessage(id, setup.noAccessMessage, {parse_mode: 'Markdown'});
	return isAccess;
}

bot.onText(/\/start/, (msg) => {
	if(checkAccess(msg.chat.id)) bot.sendMessage(msg.chat.id, setup.startMessage, {parse_mode: 'Markdown'});
});

bot.onText(/\/ping/, (msg) => {
	if(checkAccess(msg.chat.id))  bot.sendMessage(msg.chat.id, setup.pingMessage, {parse_mode: 'Markdown'});
});

bot.onText(/\/dump/, async (msg) => {
	if(!checkAccess(msg.chat.id)) return;

	let dump = await db.getDump();
	bot.sendDocument(msg.chat.id, dump, {}, {
	  filename: 'dump_' + dateFormat(new Date(), 'yyyy-mm-dd	HH:MM:ss') + '.json',
	  contentType: 'json'
	});
});

module.exports.notify = (log) => {
  let header = `${setup.types[log.type] || setup.types.default} *${log.label || setup.defaultLabel}*\n`;
  let date = `__${log.date}__\n`;
  let msg = `\`\`\`${log.msg}\`\`\``;

	users.forEach((id) => {
		bot.sendMessage(id, header + date + msg, {parse_mode: 'Markdown'});
	});
}
