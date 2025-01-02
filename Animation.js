console.log("Animation.js loaded");

let selectedGiftBox = null;

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded");

    const giftBoxes = document.querySelectorAll('.gift-box');

    function animateGiftBox(chosenBox) {
        selectedGiftBox = chosenBox;

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

    // Event listeners to click gift boxes and key events
    giftBoxes.forEach(box => {
        box.addEventListener('click', () => animateGiftBox(box));
    });

    const circle = document.getElementById('circle');
    let progress = 0;
    const increment = 5;
    const maxProgress = 100;
    const decrementRate = 0.1;
    let isDecrementing = false;
    let canShake = true;

    function handleKeyDown(event) {
        if ((event.key === 'f' || event.key === 'F') && canShake) {
            canShake = false;
            progress += increment;
            if (progress > maxProgress) {
                progress = maxProgress;
            }
            updateCircle();
            isDecrementing = false;

            giftBoxes.forEach(box => {
                box.style.transition = 'none';
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

                setTimeout(() => {
                    box.style.transition = '';
                }, 450);
            });
        }
    }

    function handleKeyUp(event) {
        if (event.key === 'f' || event.key === 'F') {
            canShake = true;
            startDecrement();
        }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    function updateCircle() {
        circle.style.background = `conic-gradient(#28a745 0% ${progress}%, rgba(255, 255, 255, 0) ${progress}% 100%)`;
    }

    async function smoothDecrement() {
        if (progress > 0) {
            if (progress > 95) {
                openPresent();
                await delay(9990000); // Simulate a long delay until present is opened
            }
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

    startDecrement();
});

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const items = [
    'https://www.csgodatabase.com/images/skins/AK-47_B_the_Monster.png',
    'https://th.bing.com/th/id/R.598b0c21ae7577e3911bdeaf215f6a10?rik=mYGFFMxcvtQW6w&riu=http%3a%2f%2fpngimg.com%2fuploads%2fbook%2fbook_PNG2116.png&ehk=t3rvVsFXFNhJQE%2bHTxNEsklPMuqozVePr1XVCsPPJ9w%3d&risl=&pid=ImgRaw&r=0'
];

async function openPresent() {
    console.log("Opening present...");
    if (selectedGiftBox) {
        selectedGiftBox.src = 'smoke-10073.gif';
        selectedGiftBox.style.width = '30%';
        selectedGiftBox.style.height = '30%';
        selectedGiftBox.style.left = '35%';
        console.log("Selected gift box after:", selectedGiftBox);
        const circle = document.getElementById('circle');
        circle.style.opacity = '0%';
        await delay(1400);
        selectedGiftBox.src = items[Math.floor(Math.random() * items.length)];
        console.log("Present opened");

        // Disable further interactions after the present is opened
        disableInteractions();
        await delay(9999999000);
    }
}

function disableInteractions() {
    // Remove event listeners from gift boxes
    const giftBoxes = document.querySelectorAll('.gift-box');
    giftBoxes.forEach(box => {
        box.removeEventListener('click', () => animateGiftBox(box));
    });

    // Remove key event listeners
    document.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('keyup', handleKeyUp);

    console.log("All interactions have been disabled.");
}
