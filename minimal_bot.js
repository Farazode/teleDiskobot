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
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  if (msg.text === '/test_web_app_data') {
    const fakeWebAppData = {
      message: {
        chat: { id: chatId },
        from: { 
          id: userId, 
          first_name: msg.from.first_name || 'First', 
          last_name: msg.from.last_name || 'Last', 
          username: msg.from.username || 'username' 
        },
      },
      web_app_data: { data: 'get_invite_link' }
    };
    console.log('Emitting fake web_app_data event:', JSON.stringify(fakeWebAppData, null, 2));
    bot.emit('web_app_data', fakeWebAppData);
  }
});

bot.on('update', (update) => {
  console.log('Received update:', JSON.stringify(update, null, 2));
});

bot.on('web_app_data', (msg) => {
  console.log('web_app_data event received:', JSON.stringify(msg, null, 2));

  if (!msg.message || !msg.message.chat || !msg.message.chat.id || !msg.from || !msg.from.id || !msg.web_app_data || !msg.web_app_data.data) {
    console.error('Incomplete web_app_data event:', JSON.stringify(msg, null, 2));
    return;
  }

  const chatId = msg.message.chat.id;
  const userId = msg.from.id;
  const data = msg.web_app_data.data;

  console.log(`Received web_app_data: ${data} from user ${userId} in chat ${chatId}`);

  if (data === 'get_invite_link') {
    const inviteLink = `https://t.me/teleDisk0bot?start=${userId}`;
    bot.sendMessage(chatId, `Share this link with your friends: ${inviteLink}`)
      .then(() => console.log('Invite link sent'))
      .catch((error) => console.error('Error sending invite link:', error));
  }
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

console.log('Bot is running...');
