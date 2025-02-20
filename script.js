document.addEventListener("DOMContentLoaded", function() {
    // Smooth Scroll for Navigation Links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Contact Form Submission (Demo Only)
    document.querySelector("form").addEventListener("submit", function(e) {
        e.preventDefault();
        alert("Thank you for your message! I'll get back to you soon.");
    });
});
