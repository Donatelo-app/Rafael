'use strict';

const dateFormat = require('dateformat');
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true, filepath: false });
const db = require('./db');
const setup = require('../setup');

bot.onText(/\/start/, (msg) => {
	let isAccess = setup.users.find((id) => id === msg.chat.id);
	if(isAccess) bot.sendMessage(msg.chat.id, setup.startMessage, {parse_mode: 'Markdown'});
	else bot.sendMessage(msg.chat.id, setup.noAccessMessage, {parse_mode: 'Markdown'});
});

bot.onText(/\/ping/, (msg) => {
	bot.sendMessage(msg.chat.id, setup.pingMessage, {parse_mode: 'Markdown'});
});

bot.onText(/\/dump/, async (msg) => {
	let dump = await db.getDump();
	bot.sendDocument(msg.chat.id, dump, {}, {
	  filename: 'dump_' + dateFormat(new Date(), 'yyyy-mm-dd	HH:MM:ss') + '.json',
	  contentType: 'json'
	});
});

module.exports.notify = (log) => {
  let header = `${setup.types[log.type] || setup.types.default} **${log.label || setup.types.default}**\n`;
  let date = `__${log.date}__\n`;
  let msg = `\`\`\`${log.msg}\`\`\``;

	setup.users.forEach((id) => {
		bot.sendMessage(id, header + date + msg, {parse_mode: 'Markdown'});
	});
}
