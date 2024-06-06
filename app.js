document.addEventListener('DOMContentLoaded', () => {
  const booth = document.getElementById('booth');
  const popup = document.getElementById('invitePopup');
  const closePopupButton = document.getElementById('closePopupButton');
  const getInviteLinkButton = document.getElementById('getInviteLinkButton');
  const botResponse = document.getElementById('botResponse');

  booth.addEventListener('click', () => {
    popup.style.display = 'block';
  });

  closePopupButton.addEventListener('click', () => {
    popup.style.display = 'none';
  });

  getInviteLinkButton.addEventListener('click', () => {
    Telegram.WebApp.sendData('get_invite_link');  // Sends data to the bot
    botResponse.textContent = 'Invite link request sent. Check your Telegram chat!';
    popup.style.display = 'none';
  });
});
