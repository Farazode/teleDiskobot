const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const token = '7010315190:AAHHcoW-NvgpVtFDQ6xLbe9RINk4akd2dX4'; // Replace with your actual bot token
const bot = new TelegramBot(token, { polling: true });

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

// Add a /test command to verify the bot can send messages
bot.onText(/\/test/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'The bot has permission to send messages.');
});

// Handle web_app_data event
bot.on('web_app_data', (msg) => {
  console.log('web_app_data event received:', msg);
  const chatId = msg.message.chat.id;
  const userId = msg.from.id;
  const data = msg.web_app_data.data;

  console.log(`Received web_app_data: ${data} from user ${userId} in chat ${chatId}`);

  if (data === 'get_invite_link') {
    const inviteLink = `https://t.me/teleDisk0bot?start=${userId}`; // Replace YOUR_BOT_USERNAME with your bot's username
    bot.sendMessage(chatId, `Share this link with your friends: ${inviteLink}`)
      .then(() => console.log('Invite link sent'))
      .catch((error) => console.error('Error sending invite link:', error));
  }
});

// Handle /start command
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

// Handle /invite command
bot.onText(/\/invite/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const inviteLink = `https://t.me/teleDisk0bot?start=${userId}`; // Replace YOUR_BOT_USERNAME with your bot's username

  bot.sendMessage(chatId, `Share this link with your friends: ${inviteLink}`);
});

// Handle /start with argument (invitation)
const users = {};

bot.onText(/\/start (\d+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const newUserId = msg.from.id;
  const inviterId = parseInt(match[1]);

  if (!users[inviterId]) {
    users[inviterId] = { invites: [] };
  }

  if (!users[newUserId]) {
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
