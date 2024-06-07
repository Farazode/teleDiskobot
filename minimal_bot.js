const TelegramBot = require('node-telegram-bot-api');

const token = '7010315190:AAHHcoW-NvgpVtFDQ6xLbe9RINk4akd2dX4'; // Replace with your actual bot token
const bot = new TelegramBot(token, { polling: true });

bot.on('polling_error', (error) => {
  console.error('Polling error:', error);
});

bot.on('error', (error) => {
  console.error('Bot error:', error);
});

bot.on('message', (msg) => {
  console.log('Received message:', JSON.stringify(msg, null, 2));
});

bot.on('update', (update) => {
  console.log('Received update:', JSON.stringify(update, null, 2));
});

bot.onText(/\/test/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'The bot is running and can send messages.');
});

bot.on('web_app_data', (msg) => {
  console.log('web_app_data event received:', JSON.stringify(msg, null, 2));
});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Open Teledisko Mini App',
            web_app: { url: 'https://farazode.github.io/teleDiskobot/' } // Ensure this URL is correct
          }
        ]
      ]
    }
  };

  bot.sendMessage(chatId, 'Welcome to Teledisko Bot! Click the button below to start the interaction.', options);
});
