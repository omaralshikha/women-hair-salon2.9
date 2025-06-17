document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for fade-in animations
    const fadeElements = document.querySelectorAll('.fade-in');
    const aboutSection = document.querySelector(".about-section");
    const productsSection = document.querySelector(".products-section");
    const servicesSection = document.querySelector(".services-section");
    const hairstylesSection = document.querySelector(".hairstyles-gallery-section");
    const pricingSection = document.querySelector(".pricing-section");
    const gallerySection = document.querySelector(".gallery-section");
    const testimonialsSection = document.querySelector(".testimonials-section");
    const bookingSection = document.querySelector(".booking-section");
    
    // Get all sections for observation
    const sections = [
      aboutSection,
      productsSection,
      servicesSection,
      hairstylesSection,
      pricingSection,
      gallerySection,
      testimonialsSection,
      bookingSection
    ].filter(section => section !== null);

    const observerOptions = {
      root: null, // relative to document viewport
      rootMargin: "0px",
      threshold: 0.1, // trigger when 10% of the element is visible
    };

    // Observer for individual fade elements
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          fadeObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observer for sections to trigger staggered animations
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const section = entry.target;
          const sectionElements = section.querySelectorAll('.fade-in');
          
          // Apply staggered animations when section becomes visible
          if (sectionElements.length > 0) {
            sectionElements.forEach((element, index) => {
              setTimeout(() => {
                element.classList.add("visible");
              }, 200 * index);
            });
          }
          
          sectionObserver.unobserve(section);
        }
      });
    }, observerOptions);

    // Observe all sections for staggered animations
    sections.forEach(section => {
      sectionObserver.observe(section);
    });

    // Observe individual fade elements that are not part of sections
    fadeElements.forEach((element) => {
      // Check if the element is not within any of our observed sections
      const isInSection = sections.some(section => 
        section && section.contains(element)
      );
      
      if (!isInSection) {
        fadeObserver.observe(element);
      }
    });

  const heroSection = document.querySelector(".hero");
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navMenu = document.getElementById("navMenu");

  // Mobile menu toggle
  if (mobileMenuBtn && navMenu) {
    // Create backdrop element for mobile menu
    const backdrop = document.createElement('div');
    backdrop.classList.add('mobile-menu-backdrop');
    document.body.appendChild(backdrop);
    
    // Toggle menu function
    const toggleMenu = () => {
      navMenu.classList.toggle("active");
      backdrop.classList.toggle("active");
      const isExpanded = navMenu.classList.contains("active");
      mobileMenuBtn.setAttribute("aria-expanded", isExpanded);
      
      // Toggle body scroll
      if (isExpanded) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    };
    
    // Toggle menu on button click
    mobileMenuBtn.addEventListener("click", toggleMenu);
    
    // Close menu when backdrop is clicked
    backdrop.addEventListener("click", toggleMenu);
    
    // Close menu when a nav link is clicked
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
          toggleMenu();
        }
      });
    });
  }

  // Hero section interaction (existing code)
  if (heroSection) {
    // Initial state for small screens: No filter, text visible (handled by CSS)

    heroSection.addEventListener("mouseenter", () => {
      if (window.innerWidth <= 480) {
        heroSection.classList.add("clear-filter"); // Despite the name, this now applies filter and hides text
      }
    });

    heroSection.addEventListener("mouseleave", () => {
      if (window.innerWidth <= 480) {
        heroSection.classList.remove("clear-filter"); // Removes filter and shows text
      }
    });

    heroSection.addEventListener("click", () => {
      if (window.innerWidth <= 480) {
        // Toggle 'clear-filter' on click. If it's already filtered from hover, this click will remove filter.
        // If it's not filtered, this click will apply filter and hide text.
        heroSection.classList.toggle("clear-filter");
      }
    });
  }
});
