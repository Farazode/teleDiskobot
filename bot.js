const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const token = '6701677975:AAF30UQoy2V1pxCSCq3uAmhaEcGUU2L4rl4';
const bot = new TelegramBot(token, { polling: true });

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

const users = {};

console.log('Bot is polling for updates...');

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

// Log all types of updates
bot.on('message', (msg) => {
  console.log('Received a message:', JSON.stringify(msg, null, 2));
  if (msg.web_app_data) {
    console.log('Received web_app_data event within message');
    handleWebAppData(msg);
  }
});

bot.on('web_app_data', (msg) => {
  console.log('Received web_app_data event:', JSON.stringify(msg, null, 2));
  handleWebAppData(msg);
});

function handleWebAppData(msg) {
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

// Handle /start command
bot.onText(/\/start/, (msg) => {
  console.log('Received /start command:', JSON.stringify(msg, null, 2));
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  if (!users[userId]) {
    users[userId] = { invites: [], invitedBy: null };
  }

  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Open Teledisko Mini App',
            web_app: { url: 'https://farazode.github.io/teleDiskobot/' }
          }
        ]
      ]
    }
  };

  bot.sendMessage(chatId, 'Welcome to Teledisko Bot! Click the button below to start the interaction.', options);
});

// Handle /invite command
bot.onText(/\/invite/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const inviteLink = `https://t.me/YOUR_BOT_USERNAME?start=${userId}`;

  bot.sendMessage(chatId, `Share this link with your friends: ${inviteLink}`);
});

// Handle /start with argument (invitation)
bot.onText(/\/start (\d+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const newUserId = msg.from.id;
  const inviterId = parseInt(match[1]);

  if (!users[inviterId] || !users[newUserId]) {
    users[newUserId] = { invites: [], invitedBy: inviterId };
  }

  if (users[inviterId].invites.includes(newUserId)) {
    bot.sendMessage(chatId, 'You have already used this invite link.');
  } else {
    users[inviterId].invites.push(newUserId);

    if (users[inviterId].invites.length >= 2) {
      bot.sendMessage(inviterId, 'Congratulations! You have invited 2 friends. You now have access to the secret group.');
    }

    bot.sendMessage(chatId, 'Thank you for joining! Now invite 2 more friends to unlock the secret group. Use /invite to get your unique invite link.');
  }
});

// Log all errors
bot.on('polling_error', (error) => console.error('Polling error:', error));
bot.on('webhook_error', (error) => console.error('Webhook error:', error));
bot.on('error', (error) => console.error('General error:', error));
