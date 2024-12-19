console.log("Animation.js loaded");

let selectedGiftBox = null; // Global variable to store the chosen gift box

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded");

    // Target all gift boxes
    const giftBoxes = document.querySelectorAll('.gift-box');

    // Function to handle the animation when a gift box is clicked
    function animateGiftBox(chosenBox) {
        selectedGiftBox = chosenBox;  // Store the chosen box in the global variable

        const circle = document.getElementById('circle');
        circle.style.opacity = '100%';

        console.log("you are the chosen one!");
        anime({
            targets: chosenBox,
            top: '30%',
            left: '40%',
            opacity: 1,
            duration: 1000,
            easing: 'easeInOutQuad'
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

    // Flag to prevent continuous 'f' key holding
    let canShake = true;

    document.addEventListener('keydown', (event) => {
        if ((event.key === 'f' || event.key === 'F') && canShake) {
            canShake = false;  // Disable further shaking until key is released
            progress += increment;
            if (progress > maxProgress) {
                progress = maxProgress;
            }
            updateCircle();
            isDecrementing = false;

            // Add shake animation to gift boxes using anime.js
            giftBoxes.forEach(box => {
                // Ensure boxes are reset to their default positions before shaking
                box.style.transition = 'none'; // Disable transition during shake
                anime({
                    targets: box,
                    translateX: [
                        { value: -10, duration: 50 },
                        { value: 10, duration: 100 },
                        { value: -10, duration: 100 },
                        { value: 10, duration: 100 },
                        { value: 0, duration: 50 }
                    ],
                    easing: 'easeInOutQuad'
                });

                // Reset transition for smooth movement after shake
                setTimeout(() => {
                    box.style.transition = ''; // Re-enable transition after shake
                }, 450); // Timeout duration after the shake is done
            });
        }
    });

    document.addEventListener('keyup', (event) => {
        if (event.key === 'f' || event.key === 'F') {
            canShake = true; // Re-enable shaking once the key is released
            startDecrement();
        }
    });

    function updateCircle() {
        circle.style.background = `conic-gradient(#28a745 0% ${progress}%, rgba(255, 255, 255, 0) ${progress}% 100%)`;
    }

    function smoothDecrement() {
        if (progress > 0) {
            if (progress > 95) openPresent();
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

function openPresent() {
    console.log("Opening present...");
    if (selectedGiftBox) {
        selectedGiftBox.src = 'smoke-10073.gif';
        console.log("Selected gift box after:", selectedGiftBox);
    }
}
