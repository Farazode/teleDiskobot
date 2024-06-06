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
    console.log('Get Invite Link button clicked'); // Log to ensure button click is detected
    Telegram.WebApp.sendData('get_invite_link');
    botResponse.textContent = 'Invite link request sent. Check your Telegram chat!';
    popup.style.display = 'none';
  });
});
