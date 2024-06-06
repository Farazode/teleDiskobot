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
    console.log('Get Invite Link button clicked');
    try {
      Telegram.WebApp.sendData('get_invite_link'); // Ensure data is being sent correctly
      console.log('Data sent to bot: get_invite_link');
      botResponse.textContent = 'Invite link request sent. Check your Telegram chat!';
    } catch (error) {
      console.error('Error sending data:', error);
    }
    popup.style.display = 'none';
  });
});
