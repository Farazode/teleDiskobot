const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const token = 'YOUR_TELEGRAM_BOT_TOKEN';
const bot = new TelegramBot(token, { polling: true });

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

console.log('Bot is polling for updates...');

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

// Function to handle web_app_data event
function handleWebAppData(msg) {
  console.log('Inside handleWebAppData');
  const chatId = msg.message?.chat?.id;
  const userId = msg.from.id;
  const data = msg.web_app_data.data;

  console.log(`Chat ID: ${chatId}, User ID: ${userId}, Data: ${data}`);

  if (data === 'get_invite_link') {
    const inviteLink = `https://t.me/YOUR_BOT_USERNAME?start=${userId}`;
    console.log('Generated invite link:', inviteLink);
    bot.sendMessage(chatId, `Share this link with your friends: ${inviteLink}`)
      .then(() => console.log('Invite link sent to chat:', chatId))
      .catch((error) => console.error('Error sending invite link:', error));
  }
}

// Log all incoming messages
bot.on('message', (msg) => {
  console.log('Received a message:', JSON.stringify(msg, null, 2));
  if (msg.web_app_data) {
    console.log('Received web_app_data event within message');
    handleWebAppData(msg);
  }
});

// Handle web_app_data event directly
bot.on('web_app_data', (msg) => {
  console.log('Received web_app_data event:', JSON.stringify(msg, null, 2));
  handleWebAppData(msg);
});

// Handle /start command
bot.onText(/\/start/, (msg) => {
  console.log('Received /start command:', JSON.stringify(msg, null, 2));
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Open Teledisko Mini App',
            web_app: { url: 'https://yourusername.github.io/your-repo/' } // Ensure this URL is correct
          }
        ]
      ]
    }
  };

  bot.sendMessage(chatId, 'Welcome to Teledisko Bot! Click the button below to start the interaction.', options);
});

// Log all errors
bot.on('polling_error', (error) => console.error('Polling error:', error));
bot.on('webhook_error', (error) => console.error('Webhook error:', error));
bot.on('error', (error) => console.error('General error:', error));
