// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    let currentSlide = 0;
    let slides = document.querySelectorAll('.carousel-item');
    let indicators = document.querySelectorAll('.indicator');
  
    // Function to display a specific slide
    function showSlide(index) {
      slides.forEach((slide, i) => {
        // Remove 'active' class from all slides and indicators
        slide.classList.remove('active');
        indicators[i].classList.remove('active');
        // Add 'active' class to the current slide and indicator
        if (i === index) {
          slide.classList.add('active');
          indicators[i].classList.add('active');
          // Lazy load the image for the current slide
          lazyLoadImage(slide);
        }
      });
    }
  
    // Function to lazy load images
    function lazyLoadImage(slide) {
      const img = slide.querySelector('.lazy-image');
      const spinner = slide.querySelector('.loading-spinner');
      
      // If the image hasn't been loaded yet, load it
      if (img && !img.src) {
        img.src = img.dataset.src;
        img.onload = function() {
          // Add 'loaded' class and hide the spinner when the image is loaded
          img.classList.add('loaded');
          spinner.style.display = 'none';
        }
      }
    }
  
    // Function to move the carousel in a given direction
    function moveCarousel(direction) {
      currentSlide += direction;
      // Wrap around to the beginning or end if necessary
      if (currentSlide >= slides.length) {
        currentSlide = 0;
      } else if (currentSlide < 0) {
        currentSlide = slides.length - 1;
      }
      showSlide(currentSlide);
    }
  
    // Function to set the current slide directly
    function setCurrentSlide(index) {
      currentSlide = index;
      showSlide(currentSlide);
    }
  
    // Preload the first image
    lazyLoadImage(slides[0]);
  
    // Set up auto-play functionality
    let autoPlay = setInterval(() => moveCarousel(1), 5000);
  
    // Pause auto-play when mouse is over the carousel
    document.querySelector('.carousel').addEventListener('mouseover', () => {
      clearInterval(autoPlay);
    });
  
    // Resume auto-play when mouse leaves the carousel
    document.querySelector('.carousel').addEventListener('mouseout', () => {
      autoPlay = setInterval(() => moveCarousel(1), 5000);
    });
  
    // Make moveCarousel and setCurrentSlide functions globally accessible
    window.moveCarousel = moveCarousel;
    window.setCurrentSlide = setCurrentSlide;
  
    // Display the initial slide
    showSlide(currentSlide);
  });