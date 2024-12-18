const santa = document.getElementById('santa-gif');
santa.style.transform = 'scaleX(-1)';

anime({
    targets: '#santa-gif',
    translateX: [
        { value: '-140vw', duration: 7300, easing: 'linear' },
        { value: 0, duration: 0 }
    ],
    translateY: [
        { value: '50px', duration: 1200, easing: 'easeInOutSine' },
        { value: '-50px', duration: 1200, easing: 'easeInOutSine' },
        { value: '50px', duration: 1200, easing: 'easeInOutSine' },
        { value: '-50px', duration: 1200, easing: 'easeInOutSine' },
        { value: '50px', duration: 1200, easing: 'easeInOutSine' }
    ],
    rotate: [
        { value: '-15deg', duration: 700, easing: 'easeInOutQuad' },
        { value: '15deg', duration: 1200, easing: 'easeInOutQuad' },
        { value: '-15deg', duration: 1200, easing: 'easeInOutQuad' },
        { value: '15deg', duration: 1200, easing: 'easeInOutQuad' },
        { value: '-15deg', duration: 1200, easing: 'easeInOutQuad' },
        { value: '15deg', duration: 1200, easing: 'easeInOutQuad' }
    ],
    loop: true,
    direction: 'normal'
});

document.addEventListener('DOMContentLoaded', () => {
    anime({
        targets: '.header-balls',
        translateY: ['-100vh', '5%'],
        easing: 'easeOutBounce',
        duration: 1500,
        delay: anime.stagger(200),
    });
});

function updateCount(type, value) {
    const element = document.getElementById(type);
    element.innerHTML = value;

    anime.timeline()
        .add({
            targets: element,
            translateY: [0, 50],
            duration: 500,
            easing: 'easeInCubic',
        })
        .add({
            targets: element,
            translateY: [-50, 0],
            duration: 500,
            easing: 'easeOutCubic',
        });
}

document.addEventListener('DOMContentLoaded', () => {
    let snowflakes = [];
    let numSnowflakes = 300;

    for (let i = 0; i < numSnowflakes; i++) {
        let snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.style.width = `${Math.random() * 10 + 5}px`;
        snowflake.style.height = snowflake.style.width;
        snowflake.style.left = `${Math.random()}vw`;
        document.body.appendChild(snowflake);
        snowflakes.push(snowflake);
    }

    function createSnowfall() {
        snowflakes.forEach(snowflake => {
            let startX = Math.random() * window.innerWidth;
            let endX = Math.random() * window.innerWidth;
            let duration = Math.random() * 5 + 5;

            anime({
                targets: snowflake,
                translateX: [startX, endX],
                translateY: [-10, window.innerHeight + 50],
                scale: Math.random() * 0.5 + 0.5,
                opacity: [1, 0],
                easing: 'linear',
                duration: duration * 1000,
                loop: true,
                delay: Math.random() * 2000
            });
        });
    }

    createSnowfall();
});

var countDownDate = new Date("Dec 24, 2024 18:00:00").getTime();

let old_seconds = 0, old_minutes = 0, old_hours = 0, old_days = 0;

var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (old_seconds !== seconds) {
        updateCount("seconds", seconds);
        old_seconds = seconds;
    }
    if (old_minutes !== minutes) {
        updateCount("minutes", minutes);
        old_minutes = minutes;
    }
    if (old_hours !== hours) {
        updateCount("hours", hours);
        old_hours = hours;
    }
    if (old_days !== days) {
        updateCount("days", days);
        old_days = days;
    }

    if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "Christmas!!!";
    }

}, 1000);



function changePage1(){
    window.location.href = "https://www.google.com";
}



