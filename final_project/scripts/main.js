import { loadPets, filterPets } from './pet-handler.js';
import { initializeTheme } from './theme-manager.js';

function setupMobileMenu() {
    const menuButton = document.getElementById('menu-button');
    const headerControls = document.querySelector('.header-controls');
    const overlay = document.createElement('div');
    overlay.className = 'mobile-nav-overlay';
    if (headerControls) {
        const clonedControls = headerControls.cloneNode(true);
        overlay.appendChild(clonedControls);
        document.body.appendChild(overlay);
    }
    if (menuButton) {
        menuButton.addEventListener('click', () => {
            menuButton.classList.toggle('open');
            overlay.classList.toggle('open');
            document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
        });
    }
    overlay.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            menuButton.classList.remove('open');
            overlay.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    setupMobileMenu();
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    if (document.getElementById('all-pets-grid')) {
        loadPets();
    }
    if (document.getElementById('featured-pets-grid')) {
        loadPets(true);
    }
    const filterSelect = document.getElementById('filter');
    if (filterSelect) {
        filterSelect.addEventListener('change', (event) => {
            filterPets(event.target.value);
        });
    }
    const formTimestamp = document.getElementById('form-timestamp');
    if (formTimestamp) {
        formTimestamp.value = new Date().toISOString();
    }
});