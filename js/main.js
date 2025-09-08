document.addEventListener('DOMContentLoaded', function() {
    // Add hover animation effects to robot, cat, and game icons
    const robotElements = document.querySelectorAll('.robot-icon');
    const catElements = document.querySelectorAll('.cat-icon');
    const gameElements = document.querySelectorAll('.game-icon');
    
    // Robot animation - mechanical movement
    robotElements.forEach(element => {
        element.addEventListener('mouseover', function() {
            this.style.transform = 'rotate(10deg)';
        });
        element.addEventListener('mouseout', function() {
            this.style.transform = 'rotate(0deg)';
        });
    });
    
    // Cat animation - playful bounce
    catElements.forEach(element => {
        element.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-5px)';
        });
        element.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Game animation - pixel movement
    gameElements.forEach(element => {
        element.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.1)';
        });
        element.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Handle image source swapping on mouse hover for publication images
    const publicationImages = document.querySelectorAll('.publication-image img');

    publicationImages.forEach(img => {
        const staticSrc = img.src;
        const gifSrc = img.dataset.gif;

        if (gifSrc) {
            // Preload GIF
            const preloadGif = new Image();
            preloadGif.src = gifSrc;

            img.addEventListener('mouseover', () => {
                img.src = gifSrc;
            });

            img.addEventListener('mouseout', () => {
                img.src = staticSrc;
            });
        }
    });
});