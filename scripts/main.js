document.addEventListener('DOMContentLoaded', () => {
    // --- RESPONSIVE NAVIGATION ---
    const menuButton = document.getElementById('menu-button');
    const navMenu = document.getElementById('nav-menu');

    menuButton.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        menuButton.textContent = navMenu.classList.contains('open') ? '✖' : '☰';
    });

    // --- FOOTER DATES ---
    const currentYearSpan = document.getElementById('current-year');
    const lastModifiedParagraph = document.getElementById('last-modified');

    currentYearSpan.textContent = new Date().getFullYear();
    lastModifiedParagraph.textContent = `Last Modification: ${document.lastModified}`;

    // --- COURSE DATA & DYNAMIC CONTENT ---
    const courses = [
        { code: 'CSE 110', name: 'Introduction to Programming', credits: 3, completed: true },
        { code: 'CSE 111', name: 'Programming with Functions', credits: 3, completed: true },
        { code: 'WDD 130', name: 'Web Fundamentals', credits: 3, completed: true },
        { code: 'WDD 131', name: 'Dynamic Web Fundamentals', credits: 3, completed: true },
        { code: 'ITM 111', name: 'Introduction to Databases', credits: 3, completed: true }, // Assuming CSE prefix for filtering
        { code: 'WDD 231', name: 'Frontend Development', credits: 3, completed: false }
    ];
    
    // I've marked the courses you listed as completed. I added "ITM 111" but gave it a CSE-like code for filter demonstration.
    // Adjust the `completed` property to `true` for any other courses you've finished.

    const courseContainer = document.getElementById('course-cards-container');
    const creditTotalSpan = document.getElementById('credit-total');
    const filterButtons = document.querySelectorAll('.course-filters button');

    function displayCourses(filteredCourses) {
        courseContainer.innerHTML = ''; // Clear previous cards

        filteredCourses.forEach(course => {
            const card = document.createElement('div');
            card.className = 'course-card';
            if (course.completed) {
                card.classList.add('completed');
            }
            card.textContent = course.code;
            courseContainer.appendChild(card);
        });
        
        // Calculate total credits for the displayed courses using reduce
        const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
        creditTotalSpan.textContent = totalCredits;
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button style
            filterButtons.forEach(btn => btn.classList.remove('active-filter'));
            button.classList.add('active-filter');

            const filterType = button.id;
            let filteredCourses = courses;

            if (filterType === 'filter-cse') {
                filteredCourses = courses.filter(course => course.code.startsWith('CSE') || course.code.startsWith('ITM'));
            } else if (filterType === 'filter-wdd') {
                filteredCourses = courses.filter(course => course.code.startsWith('WDD'));
            }
            
            displayCourses(filteredCourses);
        });
    });

    // Initial display of all courses
    displayCourses(courses);
});