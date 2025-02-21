"use strict";
document.addEventListener("DOMContentLoaded", () => {
  // Smooth Scroll for Navigation Links (passive listeners)
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.getElementById(link.getAttribute('href').substring(1));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }, { passive: true });
  });
  
  // Back to Top Button functionality
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 300);
  }, { passive: true });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  // Intersection Observer for Section Fade-In Effects with GSAP header animation
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        const header = entry.target.querySelector('h2');
        if (header && window.gsap) {
          gsap.fromTo(header, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" });
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  sections.forEach(section => observer.observe(section));
  
  // GSAP Animations on Load for navigation and hero content
  if (window.gsap) {
    gsap.from(".nav-links li", { opacity: 0, y: -20, stagger: 0.1, duration: 0.6 });
    gsap.from(".hero-content", { opacity: 0, y: 50, duration: 1, delay: 0.5 });
  }
  
  // Optimized Custom Cursor (disabled on touch devices)
  const customCursor = document.getElementById('customCursor');
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (!isTouchDevice && window.gsap) {
    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });
    const setCursorX = gsap.quickSetter(customCursor, "x", "px");
    const setCursorY = gsap.quickSetter(customCursor, "y", "px");
    function updateCursor() {
      setCursorX(mouseX);
      setCursorY(mouseY);
      requestAnimationFrame(updateCursor);
    }
    updateCursor();
  } else {
    customCursor.style.display = 'none';
  }
  
  // 3D Tilt Effect on Project Cards
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const rotateX = (deltaY / (rect.height / 2)) * 10;
      const rotateY = (-deltaX / (rect.width / 2)) * 10;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
  });
  
  // Hero Parallax Effect (subtle)
  const heroContent = document.querySelector('.hero-content');
  window.addEventListener('scroll', () => {
    const offset = window.scrollY * 0.2;
    heroContent.style.transform = `translateY(${offset}px)`;
  }, { passive: true });
  
  // Particle Effect in Hero Section
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  const particleCount = window.innerWidth < 600 ? 50 : 100;
  const maxVelocity = 0.5;
  function resizeCanvas() {
    const hero = document.querySelector('.hero');
    canvas.width = hero.clientWidth;
    canvas.height = hero.clientHeight;
  }
  window.addEventListener('resize', resizeCanvas, { passive: true });
  resizeCanvas();
  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.radius = Math.random() * 2 + 1;
      this.vx = (Math.random() - 0.5) * maxVelocity;
      this.vy = (Math.random() - 0.5) * maxVelocity;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
      ctx.fill();
    }
  }
  function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateParticles);
  }
  initParticles();
  animateParticles();
  
  // Chatbot Widget Functionality
  const chatbotWidget = document.getElementById('chatbot-widget');
  const chatbotToggle = document.getElementById('chatbot-toggle');
  const chatbotPrompts = document.querySelectorAll('.chatbot-prompt');
  const chatbotMessages = document.getElementById('chatbot-messages');
  
  // Prewritten responses for prompts
  const responses = {
    projects: "I've built innovative web apps, responsive designs, and robust security solutions. Check out the 'Work' section to see more!",
    achievements: "I've earned recognition in cybersecurity and web development, highlighting my commitment to excellence.",
    resume: "Curious about my experience? Download my resume here: <a href='resume.pdf' target='_blank' rel='noopener noreferrer'>Resume</a>.",
    ai: "I integrate AI into my workflows to boost creativity and efficiency. Always exploring new innovative techniques!"
  };
  
  // Toggle chatbot widget open/close
  chatbotToggle.addEventListener('click', () => {
    chatbotWidget.classList.toggle('chatbot-collapsed');
    chatbotToggle.innerHTML = chatbotWidget.classList.contains('chatbot-collapsed') ? "&#x25B2;" : "&#x25BC;";
  });
  
  // Handle prompt button clicks
  chatbotPrompts.forEach(button => {
    button.addEventListener('click', () => {
      const key = button.getAttribute('data-prompt');
      const reply = responses[key];
      if (reply) {
        appendMessage("User", button.textContent);
        setTimeout(() => {
          appendMessage("AI", reply);
        }, 500);
      }
    });
  });
  
  function appendMessage(sender, text) {
    const msg = document.createElement('div');
    msg.classList.add('chatbot-message', sender.toLowerCase());
    msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatbotMessages.appendChild(msg);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }
});
