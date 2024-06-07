const TelegramBot = require('node-telegram-bot-api');

const token = '7010315190:AAHHcoW-NvgpVtFDQ6xLbe9RINk4akd2dX4'; // Replace with your actual bot token
const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  console.log('Chat ID:', chatId);
  bot.sendMessage(chatId, `Your chat ID is: ${chatId}`);
});
