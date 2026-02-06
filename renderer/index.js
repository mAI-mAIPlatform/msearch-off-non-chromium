const input = document.getElementById('search');
const goBtn = document.getElementById('goBtn');
const settingsBtn = document.getElementById('settingsBtn');

function navigate() {
  let url = input.value.trim();

  if (!url) return;

  // si pas une url → recherche Google
  if (!url.includes('.') || url.includes(' ')) {
    url = "https://www.google.com/search?q=" + encodeURIComponent(url);
  }

  if (!url.startsWith('http')) {
    url = 'https://' + url;
  }

  window.electronAPI.navigate(url);
}

input.addEventListener('keydown', e => {
  if (e.key === 'Enter') navigate();
});

goBtn.addEventListener('click', navigate);

settingsBtn.addEventListener('click', () => {
  window.electronAPI.navigate('file://' + __dirname + '/settings.html');
});