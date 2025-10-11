import { loadPets, filterPets } from './pet-handler.js';
import { applyTheme, setupThemeToggle } from './theme-manager.js';

document.addEventListener('DOMContentLoaded', () => {
    // --- General Site Functionality ---
    // Set current year in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Hamburger menu functionality
    const menuButton = document.getElementById('menu-button');
    const nav = document.querySelector('nav');
    if (menuButton) {
        menuButton.addEventListener('click', () => {
            nav.classList.toggle('open');
            menuButton.classList.toggle('open');
        });
    }

    // Theme switcher functionality
    applyTheme();
    setupThemeToggle();
    
    // --- Page-Specific Functionality ---
    // Load pets on the Pets page and featured pets on the Home page
    if (document.getElementById('all-pets-grid')) {
        loadPets();
    }
    if (document.getElementById('featured-pets-grid')) {
        loadPets(true); // `true` indicates loading featured pets only
    }

    // Add event listener for pet filtering on the Pets page
    const filterSelect = document.getElementById('filter');
    if (filterSelect) {
        filterSelect.addEventListener('change', (event) => {
            filterPets(event.target.value);
        });
    }

    // Handle form timestamp on the Donate page
    const formTimestamp = document.getElementById('form-timestamp');
    if (formTimestamp) {
        formTimestamp.value = new Date().toISOString();
    }
});