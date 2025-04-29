document.addEventListener('DOMContentLoaded', () => {
  // Header scroll effect
  const header = document.getElementById('site-header');
  const scrollThreshold = 100;

  function handleScroll() {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll);
  
  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mainMenu = document.getElementById('main-menu');
  
  mobileMenuToggle.addEventListener('click', () => {
    mainMenu.classList.toggle('show');
    mobileMenuToggle.classList.toggle('mobile-menu-open');
    document.body.classList.toggle('menu-open');
  });
  
  // Close mobile menu when clicking on a menu item
  const menuItems = mainMenu.querySelectorAll('a');
  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      if (mainMenu.classList.contains('show')) {
        mainMenu.classList.remove('show');
        mobileMenuToggle.classList.remove('mobile-menu-open');
        document.body.classList.remove('menu-open');
      }
    });
  });
  
  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      const headerHeight = header.offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = targetPosition - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });
  });
  
  // Form submissions with validation
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Basic validation
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      
      let isValid = true;
      
      if (!nameInput.value.trim()) {
        markInvalid(nameInput, 'Please enter your name');
        isValid = false;
      } else {
        markValid(nameInput);
      }
      
      if (!emailInput.value.trim()) {
        markInvalid(emailInput, 'Please enter your email');
        isValid = false;
      } else if (!isValidEmail(emailInput.value.trim())) {
        markInvalid(emailInput, 'Please enter a valid email address');
        isValid = false;
      } else {
        markValid(emailInput);
      }
      
      if (!messageInput.value.trim()) {
        markInvalid(messageInput, 'Please enter your message');
        isValid = false;
      } else {
        markValid(messageInput);
      }
      
      if (isValid) {
        // For demonstration purposes just show a success message
        // In a real application, we would send the form data to a server
        contactForm.innerHTML = `
          <div class="success-message">
            <i class="fas fa-check-circle"></i>
            <h3>Thank you for your message!</h3>
            <p>We've received your inquiry and will respond within 48 hours.</p>
          </div>
        `;
      }
    });
  }
  
  // Helper functions for form validation
  function markInvalid(element, message) {
    element.classList.add('invalid');
    
    let errorMessage = element.parentElement.querySelector('.error-message');
    if (!errorMessage) {
      errorMessage = document.createElement('p');
      errorMessage.className = 'error-message';
      element.parentElement.appendChild(errorMessage);
    }
    
    errorMessage.textContent = message;
  }
  
  function markValid(element) {
    element.classList.remove('invalid');
    
    const errorMessage = element.parentElement.querySelector('.error-message');
    if (errorMessage) {
      errorMessage.remove();
    }
  }
  
  function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  }
  
  // Newsletter Form
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (!emailInput.value.trim() || !isValidEmail(emailInput.value.trim())) {
        emailInput.classList.add('invalid');
        return;
      }
      
      // For demonstration purposes
      const originalHTML = newsletterForm.innerHTML;
      newsletterForm.innerHTML = '<p>Thank you for subscribing!</p>';
      
      // Reset after 3 seconds
      setTimeout(() => {
        newsletterForm.innerHTML = originalHTML;
        newsletterForm.querySelector('input[type="email"]').value = '';
      }, 3000);
    });
  }
  
  // Add animations to elements when they come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.eligibility-card, .step, .info-item, .resource-card');
    
    elements.forEach((element, index) => {
      element.classList.add(`animate-delay-${(index % 3) + 1}`);
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-fadeIn');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          root: null,
          threshold: 0.1,
          rootMargin: '0px'
        }
      );
      
      observer.observe(element);
    });
  };
  
  animateOnScroll();
});