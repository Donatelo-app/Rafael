'use strict';

const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
const setup = require('../setup');

bot.onText(/\/start/, (msg) => {
	let isAccess = setup.users.find((id) => id === msg.chat.id);
	if(isAccess) bot.sendMessage(msg.chat.id, setup.startMessage, 'Markdown');
	else bot.sendMessage(msg.chat.id, setup.noAccessMessage, 'Markdown');
});

bot.onText(/\/ping/, (msg) => {
	bot.sendMessage(msg.chat.id, setup.pingMessage, 'Markdown');
});

module.exports.notify = (log) => {
  let header = `${setup.types[log.type] || setup.types.default} **${log.label || setup.types.default}**\n`;
  let date = `__${log.date}__\n`;
  let msg = `\`\`\`${log.msg}\`\`\``;

	setup.users.forEach((id) => {
		bot.sendMessage(id, header + date + msg, 'Markdown');
	});
}
