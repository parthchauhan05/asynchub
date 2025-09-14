// Smooth scrolling function
        function scrollToSection(sectionId) {
            const element = document.getElementById(sectionId);
            const offset = 100;
            const elementPosition = element.offsetTop;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }

        // Form submission handler
        function handleFormSubmit(event) {
            event.preventDefault();

            const formData = new FormData(event.target);
            const name = formData.get('name');

            // Create modern notification
            const notification = document.createElement('div');
            notification.className = 'fixed top-24 right-6 solid-card text-dark p-8 rounded-3xl shadow-2xl z-50 transform translate-x-full transition-all duration-700 max-w-md';
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

        // Scroll reveal animation
        function initScrollReveal() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            document.querySelectorAll('.slide-up, .slide-left, .slide-right').forEach(el => {
                observer.observe(el);
            });
        }

        // Stats counter animation
        function animateCounters() {
            const counters = document.querySelectorAll('[data-target]');

            counters.forEach(counter => {
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
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            updateCounter();
                            observer.unobserve(entry.target);
                        }
                    });
                });

                observer.observe(counter);
            });
        }

        // Scroll progress indicator
        function updateScrollProgress() {
            const scrollProgress = document.getElementById('scrollProgress');
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.offsetHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;

            scrollProgress.style.width = scrollPercent + '%';
        }

        // Initialize everything
        document.addEventListener('DOMContentLoaded', function () {
            initScrollReveal();
            animateCounters();

            // Update scroll progress on scroll
            window.addEventListener('scroll', updateScrollProgress);
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offset = 100;
                    const elementPosition = target.offsetTop;
                    const offsetPosition = elementPosition - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });