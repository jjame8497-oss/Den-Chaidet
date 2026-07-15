/**
 * Den Chaidet - Portfolio Interactive Script
 * Handles custom scroll animations, skill-bar triggering, navigation highlight, and form feedback.
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // --- DOM Elements ---
  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const navLinksList = document.getElementById('nav-links');
  const navLinks = document.querySelectorAll('.nav-link');
  const scrollTopBtn = document.getElementById('scroll-top');
  const contactForm = document.getElementById('contact-form');
  const sections = document.querySelectorAll('section');
  const progressFills = document.querySelectorAll('.skill-progress-bar-fill');
  
  // --- 1. Sticky Navigation Bar & Scroll to Top Button ---
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    
    // Sticky header
    if (scrollPos > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Scroll to Top button visibility
    if (scrollPos > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
    
    // 2. Active Navigation Highlighting
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });
    
    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
  
  // Scroll to Top action
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // --- 3. Mobile Hamburger Menu Toggle ---
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinksList.classList.toggle('active');
  });

  // Close mobile menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinksList.classList.remove('active');
    });
  });

  // --- 4. IntersectionObserver for Fade-In Scroll Animations ---
  const fadeInOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const fadeInObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
        observer.unobserve(entry.target); // Animates only once
      }
    });
  }, fadeInOptions);

  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(el => {
    fadeInObserver.observe(el);
  });

  // --- 5. IntersectionObserver for Skill Progress Bars ---
  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Trigger progress bar widths
          progressFills.forEach(fill => {
            const targetWidth = fill.getAttribute('data-width');
            fill.style.width = targetWidth;
          });
          observer.unobserve(entry.target); // Trigger only once
        }
      });
    }, { threshold: 0.2 });

    skillsObserver.observe(skillsSection);
  }

  // --- 6. Contact Form Success Feedback ---
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      
      // Visual feedback loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      
      setTimeout(() => {
        // Transform the form card content into a success card
        const formCard = contactForm.parentElement;
        formCard.innerHTML = `
          <div class="contact-success-wrapper" style="text-align: center; padding: 40px 10px;">
            <div class="success-icon" style="width: 70px; height: 70px; border-radius: 50%; background: rgba(0, 242, 254, 0.1); border: 2px solid var(--color-primary); color: var(--color-primary); display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto 24px auto; animation: scaleUp 0.5s ease-out;">
              <i class="fas fa-check"></i>
            </div>
            <h3 style="font-size: 1.6rem; margin-bottom: 12px; font-family: var(--font-primary);">Message Sent!</h3>
            <p style="color: var(--text-muted); font-size: 1rem; max-width: 320px; margin: 0 auto 24px auto;">
              Thank you, your message has been received. Den will get back to you as soon as possible!
            </p>
            <button id="reset-form-btn" class="btn btn-secondary" style="font-size: 0.9rem; padding: 10px 24px;">Send Another Message</button>
          </div>
        `;
        
        // Handle reset button inside success panel
        document.getElementById('reset-form-btn').addEventListener('click', () => {
          location.reload(); // Simple reload to bring back standard form
        });
        
      }, 1500);
    });
  }
});
