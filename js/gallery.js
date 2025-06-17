document.addEventListener('DOMContentLoaded', function() {
    // Check if device is mobile
    const isMobile = window.innerWidth <= 768;
    
    // Gallery data - can be easily modified
    const galleryItems = [
        {
            image: 'images/gallery-1.jpg',
            title: 'Natural Waves',
            description: 'Effortless everyday style'
        },
        {
            image: 'images/gallery-2.jpg',
            title: 'Elegant Updo',
            description: 'Perfect for special occasions'
        },
        {
            image: 'images/gallery-3.jpg',
            title: 'Vibrant Color',
            description: 'Express your personality'
        },
        {
            image: 'images/gallery-4.jpg',
            title: 'Sleek & Straight',
            description: 'Timeless sophistication'
        },
        {
            image: 'images/gallery-5.jpg',
            title: 'Modern Highlights',
            description: 'Dimensional brilliance'
        }
    ];

    // Get the gallery grid element
    const galleryGrid = document.querySelector('.gallery-grid');
    
    // Populate the gallery
    if (galleryGrid) {
        galleryItems.forEach((item, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item fade-in';
            
            // Create image element separately to add animation class
            const imgElement = document.createElement('img');
            imgElement.src = item.image;
            imgElement.alt = item.title;
            imgElement.className = 'gallery-img-animate';
            
            // Create overlay div
            const overlayDiv = document.createElement('div');
            overlayDiv.className = 'gallery-item-overlay';
            overlayDiv.innerHTML = `
                <h3 class="gallery-item-title">${item.title}</h3>
                <p class="gallery-item-description">${item.description}</p>
            `;
            
            // Append elements to gallery item
            galleryItem.appendChild(imgElement);
            galleryItem.appendChild(overlayDiv);
            
            // Add a slight delay to each item for a staggered effect
            galleryItem.style.animationDelay = `${index * 0.15}s`;
            
            galleryGrid.appendChild(galleryItem);
        });
    }
    
    // Add click event to gallery items for potential lightbox functionality
    const galleryItemElements = document.querySelectorAll('.gallery-item');
    galleryItemElements.forEach(item => {
        item.addEventListener('click', function() {
            // Toggle active class for mobile devices
            if (isMobile) {
                // Remove active class from all items first
                galleryItemElements.forEach(el => {
                    el.classList.remove('active');
                });
                // Add active class to clicked item
                this.classList.add('active');
            } else {
                // For desktop, just toggle the active class
                this.classList.toggle('active');
            }
        });
    });
    
    // Function to determine which gallery item is in the center of the viewport
    function updateCenterItem() {
        if (!isMobile) return; // Only apply on mobile devices
        
        const viewportHeight = window.innerHeight;
        const viewportCenter = window.scrollY + (viewportHeight / 2);
        
        let closestItem = null;
        let closestDistance = Infinity;
        
        galleryItemElements.forEach(item => {
            const rect = item.getBoundingClientRect();
            const itemCenter = window.scrollY + rect.top + (rect.height / 2);
            const distance = Math.abs(viewportCenter - itemCenter);
            
            // Remove center-item class from all items first
            item.classList.remove('center-item');
            
            if (distance < closestDistance) {
                closestDistance = distance;
                closestItem = item;
            }
        });
        
        // Add center-item class to the closest item
        if (closestItem && closestDistance < viewportHeight * 0.3) { // Only if it's reasonably close to center
            closestItem.classList.add('center-item');
        }
    }
    
    // Add animation to gallery images when they come into view
    const galleryImages = document.querySelectorAll('.gallery-img-animate');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                imageObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });
    
    galleryImages.forEach(image => {
        imageObserver.observe(image);
    });
    
    // Call updateCenterItem on scroll and resize
    window.addEventListener('scroll', updateCenterItem);
    window.addEventListener('resize', () => {
        // Update isMobile value on resize
        isMobile = window.innerWidth <= 768;
        updateCenterItem();
    });
    
    // Initial call to updateCenterItem
    updateCenterItem();
});