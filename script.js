document.addEventListener('DOMContentLoaded', function() {
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
          lazyLoadImage(slide);
        }
      });
    }
  
    function lazyLoadImage(slide) {
      const img = slide.querySelector('.lazy-image');
      const spinner = slide.querySelector('.loading-spinner');
      
      if (img && !img.src) {
        img.src = img.dataset.src;
        img.onload = function() {
          img.classList.add('loaded');
          spinner.style.display = 'none';
        }
      }
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
  
    // Preload the first image
    lazyLoadImage(slides[0]);
  
    // Auto-play functionality
    let autoPlay = setInterval(() => moveCarousel(1), 5000);
  
    document.querySelector('.carousel').addEventListener('mouseover', () => {
      clearInterval(autoPlay);
    });
  
    document.querySelector('.carousel').addEventListener('mouseout', () => {
      autoPlay = setInterval(() => moveCarousel(1), 5000);
    });
  
    // Make moveCarousel and setCurrentSlide global
    window.moveCarousel = moveCarousel;
    window.setCurrentSlide = setCurrentSlide;
  
    // Initial display
    showSlide(currentSlide);
  });