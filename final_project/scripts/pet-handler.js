let allPetsData = [];

const getPetsData = async () => {
    if (allPetsData.length > 0) {
        return allPetsData;
    }
    try {
        const response = await fetch('data/pets.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        allPetsData = await response.json();
        return allPetsData;
    } catch (error) {
        console.error("Failed to fetch pet data:", error);
        return [];
    }
};

const renderPets = (pets, containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    if (pets.length === 0) {
        container.innerHTML = '<p>No pets found.</p>';
        return;
    }
    pets.forEach((pet, index) => {
        const petCard = document.createElement('div');
        petCard.className = 'pet-card';
        petCard.dataset.petId = pet.id;
        
        // This is the key fix: Only lazy load images after the first row (index 2 for a 3-column grid).
        const lazyLoadAttribute = index > 2 ? 'loading="lazy"' : '';

        petCard.innerHTML = `
            <img src="${pet.imageUrl}" alt="A photo of ${pet.name}, a ${pet.breed}" ${lazyLoadAttribute}>
            <div class="pet-card-info">
                <h3>${pet.name}</h3>
                <p><strong>Species:</strong> ${pet.species}</p>
                <p><strong>Age:</strong> ${pet.age}</p>
                <p><strong>NGO:</strong> ${pet.ngo}</p>
            </div>
        `;
        container.appendChild(petCard);
    });
    addCardEventListeners();
};

export const loadPets = async (featuredOnly = false) => {
    const pets = await getPetsData();
    if (featuredOnly) {
        // Featured pets on the homepage are always visible first and should NOT be lazy-loaded.
        const featuredPets = pets.slice(0, 3);
        const container = document.getElementById('featured-pets-grid');
        if (!container) return;
        container.innerHTML = '';
        featuredPets.forEach(pet => {
             const petCard = document.createElement('div');
            petCard.className = 'pet-card';
            petCard.dataset.petId = pet.id;
            // No loading="lazy" attribute here
            petCard.innerHTML = `
                <img src="${pet.imageUrl}" alt="A photo of ${pet.name}, a ${pet.breed}">
                <div class="pet-card-info">
                    <h3>${pet.name}</h3>
                    <p><strong>Species:</strong> ${pet.species}</p>
                    <p><strong>Age:</strong> ${pet.age}</p>
                    <p><strong>NGO:</strong> ${pet.ngo}</p>
                </div>
            `;
            container.appendChild(petCard);
        });
        addCardEventListeners();
    } else {
        // This calls the corrected renderPets function for the main pets page
        renderPets(pets, 'all-pets-grid');
    }
};

export const filterPets = (species) => {
    const filteredPets = species === 'all' 
        ? allPetsData 
        : allPetsData.filter(pet => pet.species.toLowerCase() === species);
    renderPets(filteredPets, 'all-pets-grid');
};

const modal = document.getElementById('pet-modal');
const modalContent = document.getElementById('modal-content');
const closeModalButton = document.getElementById('modal-close-button');

const openModal = (petId) => {
    const pet = allPetsData.find(p => p.id == petId);
    if (!pet || !modal) return;
    // Images in the modal load on-demand, so no lazy loading is needed here either.
    modalContent.innerHTML = `
        <img src="${pet.imageUrl}" alt="A photo of ${pet.name}, a ${pet.breed}">
        <div>
            <h2>${pet.name}</h2>
            <p><strong>Species:</strong> ${pet.species}</p>
            <p><strong>Breed:</strong> ${pet.breed}</p>
            <p><strong>Age:</strong> ${pet.age}</p>
            <p><strong>NGO:</strong> ${pet.ngo}</p>
            <p><strong>Story:</strong> ${pet.story}</p>
        </div>
    `;
    modal.showModal();
};

if (modal) {
    closeModalButton.addEventListener('click', () => modal.close());
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.close();
        }
    });
}

const addCardEventListeners = () => {
    const petCards = document.querySelectorAll('.pet-card');
    petCards.forEach(card => {
        card.addEventListener('click', () => {
            openModal(card.dataset.petId);
        });
    });
};