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

bot.onText(/\/start/, (msg) => {
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

bot.on('web_app_data', (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const data = msg.web_app_data.data;

  if (data === 'get_invite_link') {
    const inviteLink = `https://t.me/YOUR_BOT_USERNAME?start=${userId}`;
    bot.sendMessage(chatId, `Share this link with your friends: ${inviteLink}`);
  }
});


bot.onText(/\/invite/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const inviteLink = `https://t.me/YOUR_BOT_USERNAME?start=${userId}`;

  bot.sendMessage(chatId, `Share this link with your friends: ${inviteLink}`);
});

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

app.get('/generate-invite-link', (req, res) => {
  const userId = 123456789;  // Replace this with dynamic user ID retrieval if needed
  const inviteLink = `https://t.me/YOUR_BOT_USERNAME?start=${userId}`;
  res.json({ link: inviteLink });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
