let currentSlide = 0;
let slides = document.querySelectorAll('.carousel-item');
let indicators = document.querySelectorAll('.indicator');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        indicators[i].classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
            indicators[i].classList.add('active');
        }
    });
}

function moveCarousel(direction) {
    currentSlide += direction;
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }
    showSlide(currentSlide);
}

function setCurrentSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
}

// Auto-play functionality
let autoPlay = setInterval(() => moveCarousel(1), 5000);

document.querySelector('.carousel').addEventListener('mouseover', () => {
    clearInterval(autoPlay);
});

document.querySelector('.carousel').addEventListener('mouseout', () => {
    autoPlay = setInterval(() => moveCarousel(1), 5000);
});

// Initial display
showSlide(currentSlide);
