document.addEventListener('DOMContentLoaded', () => {
  const getInviteLinkButton = document.getElementById('getInviteLinkButton');
  if (getInviteLinkButton) {
    getInviteLinkButton.addEventListener('click', () => {
      console.log('Get Invite Link button clicked');
      try {
        if (window.Telegram && window.Telegram.WebApp) {
          Telegram.WebApp.sendData('get_invite_link');
          console.log('Data sent to bot: get_invite_link');
        } else {
          console.error('Telegram WebApp object not available');
        }
      } catch (error) {
        console.error('Error sending data:', error);
      }
    });
  } else {
    console.error('getInviteLinkButton not found');
  }
});
