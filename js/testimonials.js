document.addEventListener('DOMContentLoaded', function() {
    // Testimonials data - can be easily modified
    const testimonials = [
        {
            id: 1,
            name: 'Emily Davis',
            role: 'New Client',
            image: 'images/client-1.jpg',
            quote: 'The atmosphere is so relaxing, and the staff is incredibly professional. I came in for a complete color change, and the results exceeded my expectations. I\'ll definitely be back!'
        },
        {
            id: 2,
            name: 'Sophia Martinez',
            role: 'Regular Client',
            image: 'images/client-2.jpg',
            quote: 'I\'ve been coming here for over a year now, and I\'m always impressed with the quality of service. My stylist really listens to what I want and delivers every time. This salon is a hidden gem!'
        },
        {
            id: 3,
            name: 'Olivia Johnson',
            role: 'VIP Client',
            image: 'images/client-3.jpg',
            quote: 'As someone who\'s very particular about my hair, I can confidently say this is the best salon I\'ve ever visited. The attention to detail and personalized care make all the difference. Highly recommended!'
        }
    ];

    // Get the testimonials container
    const testimonialsContainer = document.querySelector('.testimonials-container');
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    const testimonialIndicators = document.querySelector('.testimonial-indicators');
    
    // Initialize current testimonial index
    let currentTestimonialIndex = 0;
    
    // Populate the testimonials
    if (testimonialsSlider) {
        testimonials.forEach((testimonial, index) => {
            // Create testimonial item
            const testimonialItem = document.createElement('div');
            testimonialItem.className = `testimonial-item fade-in ${index === 0 ? 'active' : ''}`;
            testimonialItem.setAttribute('data-index', index);
            
            testimonialItem.innerHTML = `
                <div class="testimonial-content">
                    <div class="testimonial-quote">
                        <p>"${testimonial.quote}"</p>
                    </div>
                    <div class="testimonial-author">
                        <div class="testimonial-author-image">
                            <img src="${testimonial.image}" alt="${testimonial.name}">
                        </div>
                        <div class="testimonial-author-info">
                            <h4 class="testimonial-author-name">${testimonial.name}</h4>
                            <p class="testimonial-author-role">${testimonial.role}</p>
                        </div>
                    </div>
                </div>
            `;
            
            testimonialsSlider.appendChild(testimonialItem);
            
            // Create indicator
            const indicator = document.createElement('span');
            indicator.className = `testimonial-indicator ${index === 0 ? 'active' : ''}`;
            indicator.setAttribute('data-index', index);
            testimonialIndicators.appendChild(indicator);
            
            // Add click event to indicators
            indicator.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                showTestimonial(index);
            });
        });
    }
    
    // Function to show a specific testimonial
    function showTestimonial(index) {
        // Update current index
        currentTestimonialIndex = index;
        
        // Remove active class from all testimonials and indicators
        const testimonialItems = document.querySelectorAll('.testimonial-item');
        const indicators = document.querySelectorAll('.testimonial-indicator');
        
        testimonialItems.forEach(item => item.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active class to current testimonial and indicator
        testimonialItems[index].classList.add('active');
        indicators[index].classList.add('active');
    }
    
    // Auto-rotate testimonials every 5 seconds
    setInterval(function() {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
        showTestimonial(currentTestimonialIndex);
    }, 5000);
    
    // Add swipe functionality for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (testimonialsSlider) {
        testimonialsSlider.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        testimonialsSlider.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
    }
    
    function handleSwipe() {
        if (touchEndX < touchStartX) {
            // Swipe left - next testimonial
            currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
        } else if (touchEndX > touchStartX) {
            // Swipe right - previous testimonial
            currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
        }
        
        showTestimonial(currentTestimonialIndex);
    }
});