document.addEventListener("DOMContentLoaded", () => {
    /* Smooth Scroll for Navigation Links */
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetID = this.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetID);
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });
    });
  
    /* Typewriter Effect for Header Tagline */
    // Add a <p class="tagline"></p> in your header where you want the rotating text.
    const tagline = document.querySelector('.tagline');
    if(tagline) {
      const phrases = ["Web Developer", "Software Engineer", "Tech Enthusiast"];
      let phraseIndex = 0;
      let letterIndex = 0;
      let currentPhrase = '';
      let isDeleting = false;
      const typeSpeed = 150;
      const deleteSpeed = 100;
      const pauseTime = 2000;
      
      function type() {
        if (!isDeleting && letterIndex <= phrases[phraseIndex].length) {
          currentPhrase = phrases[phraseIndex].substring(0, letterIndex++);
          tagline.textContent = currentPhrase;
          setTimeout(type, typeSpeed);
        } else if (isDeleting && letterIndex >= 0) {
          currentPhrase = phrases[phraseIndex].substring(0, letterIndex--);
          tagline.textContent = currentPhrase;
          setTimeout(type, deleteSpeed);
        }
        
        if (!isDeleting && letterIndex === phrases[phraseIndex].length + 1) {
          isDeleting = true;
          setTimeout(type, pauseTime);
        }
        
        if (isDeleting && letterIndex === -1) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          letterIndex = 0;
          setTimeout(type, typeSpeed);
        }
      }
      type();
    }
  
    /* Active Navigation Highlighting */
    const sections = document.querySelectorAll("section");
    const observerOptions = {
      threshold: 0.5
    };
  
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.remove("active");
            if(link.getAttribute("href").substring(1) === entry.target.id) {
              link.classList.add("active");
            }
          });
        }
      });
    }, observerOptions);
  
    sections.forEach(section => {
      sectionObserver.observe(section);
    });
  
    /* Scroll-Triggered Fade-In Animations */
    // Add the class "fade-in-element" to any element you want to reveal on scroll.
    const faders = document.querySelectorAll('.fade-in-element');
    const appearOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };
  
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add('appear');
          observer.unobserve(entry.target);
        }
      });
    }, appearOptions);
  
    faders.forEach(fader => {
      appearOnScroll.observe(fader);
    });
  });
  