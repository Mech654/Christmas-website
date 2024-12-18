console.log("Animation.js loaded");

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded");
    
    // Target all gift boxes
    const giftBoxes = document.querySelectorAll('.gift-box'); 

    // Function to handle the animation when a gift box is clicked
    function animateGiftBox(chosenBox) {
        const circle = document.getElementById('circle');
        circle.style.opacity = '100%';

        console.log("you are the chosen one!");
        anime({
            targets: chosenBox,
            top: '50%',
            left: '50%',
            translateX: '-50%',
            translateY: '-50%',
            opacity: 1,
            duration: 1000,
            easing: 'easeInOutQuad',
        });

        // Reduce opacity of all other boxes
        giftBoxes.forEach(box => {
            if (box !== chosenBox) {
                anime({
                    targets: box,
                    opacity: 0,
                    duration: 800,
                    easing: 'linear'
                });
            }
        });
    }

    // Attach click event to each gift box
    giftBoxes.forEach(box => {
        box.addEventListener('click', () => animateGiftBox(box));
    });

    // Circle progress script
    const circle = document.getElementById('circle');
    let progress = 0;
    const increment = 5; // Percentage increment per 'F' key press
    const maxProgress = 100; // Maximum progress value
    const decrementRate = 0.1; // Rate at which progress decreases
    let isDecrementing = false;

    document.addEventListener('keydown', (event) => {
        if (event.key === 'f' || event.key === 'F') {
            progress += increment;
            if (progress > maxProgress) {
                progress = maxProgress;
            }
            updateCircle();
            isDecrementing = false;
            
            // Add shake animation to gift boxes
            giftBoxes.forEach(box => {
                box.classList.add('shake');
            });
        }
    });

    document.addEventListener('keyup', (event) => {
        if (event.key === 'f' || event.key === 'F') {
            startDecrement();
            
            // Remove shake animation from gift boxes
            giftBoxes.forEach(box => {
                box.classList.remove('shake');
            });
        }
    });

    function updateCircle() {
        circle.style.background = `conic-gradient(#28a745 0% ${progress}%, rgba(255, 255, 255, 0.3) ${progress}% 100%)`;
    }

    function smoothDecrement() {
        if (progress > 0) {
            progress -= decrementRate;
            if (progress < 0) {
                progress = 0;
            }
            updateCircle();
            if (isDecrementing) {
                requestAnimationFrame(smoothDecrement);
            }
        }
    }

    function startDecrement() {
        if (!isDecrementing) {
            isDecrementing = true;
            requestAnimationFrame(smoothDecrement);
        }
    }

    // Start the decrement process initially
    startDecrement();
});
