(function () {
  function c() {
    var b = a.contentDocument || a.contentWindow.document;
    if (b) {
      var d = b.createElement('script');
      d.innerHTML =
        "window.__CF$cv$params={r:'9812cfda467fac0c',t:'MTc1ODIxOTE1MC4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";
      b.getElementsByTagName('head')[0].appendChild(d);
    }
  }
  if (document.body) {
    var a = document.createElement('iframe');
    a.height = 1;
    a.width = 1;
    a.style.position = 'absolute';
    a.style.top = 0;
    a.style.left = 0;
    a.style.border = 'none';
    a.style.visibility = 'hidden';
    document.body.appendChild(a);
    if ('loading' !== document.readyState) c();
    else if (window.addEventListener)
      document.addEventListener('DOMContentLoaded', c);
    else {
      var e = document.onreadystatechange || function () {};
      document.onreadystatechange = function (b) {
        e(b);
        'loading' !== document.readyState &&
          ((document.onreadystatechange = e), c());
      };
    }
  }
})();

const copyright = (document.getElementById('copyright-year').innerText =
  new Date().getFullYear());
const expeirence = (document.getElementById('experience-year').innerText =
  copyright - 2020);

// Smooth scrolling function
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  const offset = 100;
  const elementPosition = element.offsetTop;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  });
}

// Form submission handler
function handleFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const name = formData.get('name');

  // Create modern notification
  const notification = document.createElement('div');
  notification.className =
    'fixed top-24 right-6 solid-card text-dark p-8 rounded-3xl shadow-2xl z-50 transform translate-x-full transition-all duration-700 max-w-md';
  notification.innerHTML = `
                <div class="flex items-start">
                    <div class="service-icon rounded-full p-2 mr-4 flex-shrink-0">
                        <svg class="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"/>
                        </svg>
                    </div>
                    <div>
                        <h4 class="font-bold text-lg mb-1">Message Sent Successfully!</h4>
                        <p class="text-gray-600">Thank you, ${name}! We'll get back to you within 24 hours.</p>
                    </div>
                </div>
            `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);

  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 700);
  }, 5000);

  event.target.reset();
}

// Enhanced scroll reveal animation
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add a small delay for smoother sequential animations
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, 50);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -80px 0px',
    }
  );

  // Observe elements with staggered delays for better visual flow
  const elements = document.querySelectorAll(
    '.slide-up, .slide-left, .slide-right'
  );
  elements.forEach((el, index) => {
    // Add a slight delay based on element position for cascade effect
    el.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(el);
  });
}

// Stats counter animation
function animateCounters() {
  const counters = document.querySelectorAll('[data-target]');

  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute('data-target'));
    const increment = target / 100;
    let current = 0;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };

    // Start animation when element is visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateCounter();
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(counter);
  });
}

// Scroll progress indicator and navbar shadow
function updateScrollProgress() {
  const scrollProgress = document.getElementById('scrollProgress');
  const navbar = document.getElementById('navbar');
  const scrollTop = window.pageYOffset;
  const docHeight = document.body.offsetHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;

  scrollProgress.style.width = scrollPercent + '%';

  // Add shadow to navbar when scrolling
  if (scrollTop > 50) {
    navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.boxShadow = 'none';
  }
}

// Simple Process Hover Effects
function initProcessInteraction() {
  const stepCards = document.querySelectorAll('.step-card');

  stepCards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
      const step = card.closest('.process-step');
      step.classList.add('active');

      // Animate step progress bar
      const stepProgress = card.querySelector('.step-progress');
      if (stepProgress) {
        stepProgress.style.width = '100%';
      }
    });

    card.addEventListener('mouseleave', () => {
      const step = card.closest('.process-step');
      step.classList.remove('active');

      // Reset step progress bar
      const stepProgress = card.querySelector('.step-progress');
      if (stepProgress) {
        stepProgress.style.width = '0%';
      }
    });
  });
}

// Enhanced Mobile Menu Functions
function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenuBg = document.getElementById('mobileMenuBg');
  const mobileMenuLogo = document.getElementById('mobileMenuLogo');
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  const mobileMenuItems = document.querySelectorAll('.mobile-menu-item');
  const mobileMenuCTA = document.getElementById('mobileMenuCTA');
  const mobileMenuContact = document.getElementById('mobileMenuContact');

  if (mobileMenu.classList.contains('menu-open')) {
    closeMobileMenu();
  } else {
    // Open menu
    mobileMenu.style.transform = 'translateX(0px)';
    mobileMenu.classList.add('menu-open');
    menuBtn.classList.add('hamburger-active');

    // Animate background
    setTimeout(() => {
      mobileMenuBg.style.opacity = '1';
    }, 100);

    // Animate elements in sequence
    setTimeout(() => {
      mobileMenuLogo.style.opacity = '1';
      mobileMenuLogo.style.transform = 'translateY(0)';
      mobileMenuClose.style.opacity = '1';
      mobileMenuClose.style.transform = 'translateY(0)';
    }, 200);

    // Animate menu items
    mobileMenuItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
      }, 300 + index * 100);
    });

    // Animate footer elements
    setTimeout(() => {
      mobileMenuCTA.style.opacity = '1';
      mobileMenuCTA.style.transform = 'translateY(0)';
    }, 700);

    setTimeout(() => {
      mobileMenuContact.style.opacity = '1';
      mobileMenuContact.style.transform = 'translateY(0)';
    }, 800);
  }
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenuBg = document.getElementById('mobileMenuBg');
  const mobileMenuLogo = document.getElementById('mobileMenuLogo');
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  const mobileMenuItems = document.querySelectorAll('.mobile-menu-item');
  const mobileMenuCTA = document.getElementById('mobileMenuCTA');
  const mobileMenuContact = document.getElementById('mobileMenuContact');

  // Reset all animations
  mobileMenuBg.style.opacity = '0';
  mobileMenuLogo.style.opacity = '0';
  mobileMenuLogo.style.transform = 'translateY(16px)';
  mobileMenuClose.style.opacity = '0';
  mobileMenuClose.style.transform = 'translateY(16px)';
  mobileMenuCTA.style.opacity = '0';
  mobileMenuCTA.style.transform = 'translateY(16px)';
  mobileMenuContact.style.opacity = '0';
  mobileMenuContact.style.transform = 'translateY(16px)';

  mobileMenuItems.forEach((item) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(32px)';
  });

  // Close menu
  setTimeout(() => {
    mobileMenu.style.transform = 'translateX(100%)';
    mobileMenu.classList.remove('menu-open');
    menuBtn.classList.remove('hamburger-active');
  }, 200);
}

// Enhanced smooth scrolling function
function smoothScrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (!element) return;

  const offset = 100;
  const elementPosition = element.offsetTop;
  const offsetPosition = elementPosition - offset;
  const startPosition = window.pageYOffset;
  const distance = offsetPosition - startPosition;
  const duration = Math.min(Math.abs(distance) / 2, 1500); // Dynamic duration based on distance
  let start = null;

  function animation(currentTime) {
    if (start === null) start = currentTime;
    const timeElapsed = currentTime - start;
    const progress = Math.min(timeElapsed / duration, 1);

    // Easing function for smooth animation
    const easeInOutCubic =
      progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    window.scrollTo(0, startPosition + distance * easeInOutCubic);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function () {
  initScrollReveal();
  animateCounters();
  initProcessInteraction();

  // Update scroll progress on scroll
  window.addEventListener('scroll', updateScrollProgress);

  // Close mobile menu when clicking outside
  document.addEventListener('click', function (e) {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuBtn = document.getElementById('mobileMenuBtn');

    if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
      closeMobileMenu();
    }
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 100;
      const elementPosition = target.offsetTop;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  });
});
