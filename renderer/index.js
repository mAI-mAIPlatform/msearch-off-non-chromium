// On récupère l'input
const input = document.getElementById('search');

// On écoute la touche "Enter"
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    let url = input.value.trim();

    // Ajouter https:// si l'utilisateur ne l'a pas mis
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    // Envoi au main process pour charger l'URL
    window.electronAPI.navigate(url);

    // Optionnel : vider le champ après navigation
    input.value = '';
  }
});