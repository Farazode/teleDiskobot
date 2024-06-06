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
    fetch('/generate-invite-link')
      .then(response => response.json())
      .then(data => {
        alert('Share this link with your friends: ' + data.link);
        popup.style.display = 'none';
        botResponse.textContent = 'Invite link generated. Check your Telegram chat!';
      })
      .catch(error => {
        console.error('Error generating invite link:', error);
        botResponse.textContent = 'Failed to generate invite link. Please try again.';
      });
  });

  // Initialize Telegram Web App
  const tg = window.Telegram.WebApp;
  tg.ready();

  // Use Telegram theme color for the popup
  tg.MainButton.setParams({ text: 'Close' });
  closePopupButton.addEventListener('click', () => {
    tg.MainButton.hide();
  });

  getInviteLinkButton.addEventListener('click', () => {
    tg.MainButton.hide();
  });
});
