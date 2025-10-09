document.addEventListener('DOMContentLoaded', () => {
    // --- Reusable Page Setup (Footer) --- //
    const currentYearSpan = document.getElementById('current-year');
    const lastModifiedParagraph = document.getElementById('last-modified');
    currentYearSpan.textContent = new Date().getFullYear();
    lastModifiedParagraph.textContent = `Last Modification: ${document.lastModified}`;

    // --- Get URL Parameters and Display Summary --- //
    const params = new URLSearchParams(window.location.search);

    document.getElementById('summary-fname').textContent = params.get('fname');
    document.getElementById('summary-lname').textContent = params.get('lname');
    document.getElementById('summary-email').textContent = params.get('email');
    document.getElementById('summary-phone').textContent = params.get('phone');
    document.getElementById('summary-org').textContent = params.get('organization');
    
    const timestamp = params.get('timestamp');
    const formattedDate = new Date(timestamp).toLocaleString();
    document.getElementById('summary-timestamp').textContent = formattedDate;
});