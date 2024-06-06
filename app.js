document.addEventListener('DOMContentLoaded', () => {
  const getInviteLinkButton = document.getElementById('getInviteLinkButton');
  getInviteLinkButton.addEventListener('click', () => {
    console.log('Get Invite Link button clicked');
    try {
      Telegram.WebApp.sendData('get_invite_link');
      console.log('Data sent to bot: get_invite_link');
    } catch (error) {
      console.error('Error sending data:', error);
    }
  });
});
