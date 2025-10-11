let allPetsData = []; // Cache for the fetched pet data

// Function to fetch pet data from JSON file
// This demonstrates async/await with try...catch
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
        return []; // Return empty array on error
    }
};

// Function to render pet cards to the DOM
// Demonstrates array methods (forEach) and template literals
const renderPets = (pets, containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = ''; // Clear previous content
    if (pets.length === 0) {
        container.innerHTML = '<p>No pets found.</p>';
        return;
    }

    pets.forEach(pet => {
        const petCard = document.createElement('div');
        petCard.className = 'pet-card';
        petCard.dataset.petId = pet.id;
        
        // Template literal for card content
        petCard.innerHTML = `
            <img src="${pet.imageUrl}" alt="A photo of ${pet.name}, a ${pet.breed}" loading="lazy">
            <div class="pet-card-info">
                <h3>${pet.name}</h3>
                <p><strong>Species:</strong> ${pet.species}</p>
                <p><strong>Age:</strong> ${pet.age}</p>
                <p><strong>NGO:</strong> ${pet.ngo}</p>
            </div>
        `;
        container.appendChild(petCard);
    });

    // Add event listeners to the newly created cards for the modal
    addCardEventListeners();
};

// Main function to load and display pets
export const loadPets = async (featuredOnly = false) => {
    const pets = await getPetsData();
    if (featuredOnly) {
        const featuredPets = pets.slice(0, 3); // Display first 3 as featured
        renderPets(featuredPets, 'featured-pets-grid');
    } else {
        renderPets(pets, 'all-pets-grid');
    }
};

// Function to filter pets based on species
// Demonstrates array method (filter)
export const filterPets = (species) => {
    const filteredPets = species === 'all' 
        ? allPetsData 
        : allPetsData.filter(pet => pet.species.toLowerCase() === species);
    renderPets(filteredPets, 'all-pets-grid');
};

// --- Modal Functionality ---
const modal = document.getElementById('pet-modal');
const modalContent = document.getElementById('modal-content');
const closeModalButton = document.getElementById('modal-close-button');

const openModal = (petId) => {
    const pet = allPetsData.find(p => p.id == petId);
    if (!pet || !modal) return;
    
    // DOM Manipulation and Template Literals for modal content
    modalContent.innerHTML = `
        <img src="${pet.imageUrl}" alt="A photo of ${pet.name}, a ${pet.breed}" loading="lazy">
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

// Add event listeners to pet cards
const addCardEventListeners = () => {
    const petCards = document.querySelectorAll('.pet-card');
    petCards.forEach(card => {
        card.addEventListener('click', () => {
            openModal(card.dataset.petId);
        });
    });
};