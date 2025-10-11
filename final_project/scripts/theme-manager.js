const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 9c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3-1.35-3-3-3m0-2c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5M2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1m18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1M11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1m0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1M5.64 6.36c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41l1.06 1.06c.39.39 1.02.39 1.41 0s.39-1.02 0-1.41L5.64 6.36m12.73 12.73c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41l1.06 1.06c.39.39 1.02.39 1.41 0s.39-1.02 0-1.41l-1.06-1.06M6.7 18.36l-1.06-1.06c-.39-.39-.39-1.02 0-1.41s1.02-.39 1.41 0l1.06 1.06c.39.39.39 1.02 0 1.41s-1.02.39-1.41 0m12.73-12.73l-1.06-1.06c-.39-.39-.39-1.02 0-1.41s1.02-.39 1.41 0l1.06 1.06c.39.39.39 1.02 0 1.41s-1.02.39-1.41 0"/></svg>`;
const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.3 4.9c.4-.2.6-.7.4-1.1-.2-.4-.7-.6-1.1-.4C7.2 5.1 4 8.8 4 13c0 4.4 3.6 8 8 8 3.5 0 6.5-2.2 7.6-5.4.2-.4 0-.9-.4-1.1s-.9-.1-1.1.2c-.8 1.9-2.6 3.2-4.7 3.2-2.8 0-5-2.2-5-5 0-2.5 1.8-4.5 4.2-4.9z"/></svg>`;

function applyTheme(theme) {
    const buttons = document.querySelectorAll('#theme-toggle-button');
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        buttons.forEach(btn => btn.innerHTML = sunIcon);
    } else {
        document.body.classList.remove('dark-mode');
        buttons.forEach(btn => btn.innerHTML = moonIcon);
    }
}
function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
}
export function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
    document.body.addEventListener('click', (e) => {
        if (e.target.closest('#theme-toggle-button')) {
            toggleTheme();
        }
    });
}