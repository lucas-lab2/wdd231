document.addEventListener('DOMContentLoaded', () => {

    // --- Hamburger Menu --- //
    const menuButton = document.getElementById('menu-button');
    const navMenu = document.getElementById('nav-menu');

    menuButton.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        menuButton.textContent = navMenu.classList.contains('open') ? '✕' : '☰';
    });

    // --- Footer Dynamic Dates --- //
    const currentYearSpan = document.getElementById('current-year');
    const lastModifiedParagraph = document.getElementById('last-modified');

    const currentYear = new Date().getFullYear();
    currentYearSpan.textContent = currentYear;

    const lastModified = document.lastModified;
    lastModifiedParagraph.textContent = `Last Modification: ${lastModified}`;

    // --- Directory Page Logic --- //
    const membersContainer = document.getElementById('members-container');
    const gridViewButton = document.getElementById('grid-view');
    const listViewButton = document.getElementById('list-view');
    const membersURL = 'data/members.json';

    // Function to fetch member data
    async function getMembers() {
        try {
            const response = await fetch(membersURL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            displayMembers(data.members);
        } catch (error) {
            console.error('Error fetching member data:', error);
            membersContainer.innerHTML = '<p>Sorry, member data could not be loaded at this time.</p>';
        }
    }

    // Function to display members
    const displayMembers = (members) => {
        membersContainer.innerHTML = ''; // Clear existing content
        members.forEach(member => {
            const memberCard = document.createElement('section');
            
            const name = document.createElement('h3');
            name.textContent = member.name;

            const address = document.createElement('p');
            address.textContent = member.address;

            const phone = document.createElement('p');
            phone.textContent = member.phone;

            const website = document.createElement('a');
            website.href = member.websiteURL;
            website.textContent = 'Visit Website';
            website.target = '_blank';
            website.rel = 'noopener noreferrer';

            const image = document.createElement('img');
            image.src = member.image;
            image.alt = `${member.name} Logo`;
            image.loading = 'lazy';
            image.width = 150;
            image.height = 100;

            const level = document.createElement('p');
            level.textContent = `Membership: ${member.membershipLevel}`;

            // Append elements to the card
            memberCard.appendChild(image);
            memberCard.appendChild(name);
            memberCard.appendChild(address);
            memberCard.appendChild(phone);
            memberCard.appendChild(website);
            memberCard.appendChild(level);

            membersContainer.appendChild(memberCard);
        });
    }

    // Event listeners for view toggles
    if (gridViewButton && listViewButton && membersContainer) {
        gridViewButton.addEventListener('click', () => {
            membersContainer.classList.add('grid');
            membersContainer.classList.remove('list');
            gridViewButton.classList.add('active');
            listViewButton.classList.remove('active');
        });

        listViewButton.addEventListener('click', () => {
            membersContainer.classList.add('list');
            membersContainer.classList.remove('grid');
            listViewButton.classList.add('active');
            gridViewButton.classList.remove('active');
        });
    }

    // Initial fetch of members if on the directory page
    if (membersContainer) {
        getMembers();
    }
});