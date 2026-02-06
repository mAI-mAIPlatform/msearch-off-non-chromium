// Elements
const view = document.getElementById('view');
const input = document.getElementById('search');
const backBtn = document.getElementById('backBtn');
const fwdBtn = document.getElementById('fwdBtn');
const reloadBtn = document.getElementById('reloadBtn');
const homeBtn = document.getElementById('homeBtn');
const goBtn = document.getElementById('goBtn');

const HOME_URL = 'https://www.google.com';

// Navigation Logic
function navigateTo(query) {
    let url = query.trim();
    if (!url) return;

    // Simple check if it looks like a domain or url
    const hasSpace = url.includes(' ');
    const hasDot = url.includes('.');

    // Improved regex or logic can be added here
    if (!hasSpace && hasDot) {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
    } else if (!url.startsWith('http://') && !url.startsWith('https://')) {
        // Treat as search query
        url = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
    }

    view.loadURL(url);
}

// Event Listeners
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        navigateTo(input.value);
        input.blur();
    }
});

goBtn.addEventListener('click', () => {
    navigateTo(input.value);
});

backBtn.addEventListener('click', () => {
    if (view.canGoBack()) view.goBack();
});

fwdBtn.addEventListener('click', () => {
    if (view.canGoForward()) view.goForward();
});

homeBtn.addEventListener('click', () => {
    view.loadURL(HOME_URL);
});

// Dynamic Reload/Stop Button
function updateReloadBtn(isLoading) {
    const icon = reloadBtn.querySelector('span');
    if (isLoading) {
        icon.textContent = 'close';
        reloadBtn.onclick = () => view.stop();
    } else {
        icon.textContent = 'refresh';
        reloadBtn.onclick = () => view.reload();
    }
}

// Webview Events
view.addEventListener('did-start-loading', () => {
    updateReloadBtn(true);
});

view.addEventListener('did-stop-loading', () => {
    updateReloadBtn(false);
    // Update URL bar only when loading stops or navigation happens
    // We might want to update it immediately on navigation though
});

view.addEventListener('did-navigate', (e) => {
    input.value = e.url;
});

view.addEventListener('did-navigate-in-page', (e) => {
    input.value = e.url;
});

view.addEventListener('dom-ready', () => {
    input.value = view.getURL();
});

// Initialize Reload Button
updateReloadBtn(false);
