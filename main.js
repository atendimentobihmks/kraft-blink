import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for scroll reveals
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });

  // Carousel Logic
  const track = document.getElementById('carouselTrack');
  if(!track) return;
  const slides = Array.from(track.children);
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  const dotsContainer = document.getElementById('carouselDots');
  
  let currentIndex = 0;

  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.children);

  const updateDots = () => {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
  };

  const goToSlide = (index) => {
    currentIndex = index;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
  };

  nextBtn.addEventListener('click', () => {
    if (currentIndex < slides.length - 1) {
      goToSlide(currentIndex + 1);
    } else {
      goToSlide(0); // loop back
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
    } else {
      goToSlide(slides.length - 1); // loop to end
    }
  });

  // Optional auto-play
  let autoplayInterval = setInterval(() => {
    if (currentIndex < slides.length - 1) {
      goToSlide(currentIndex + 1);
    } else {
      goToSlide(0);
    }
  }, 5000);

  // Pause autoplay on hover/interaction
  const carouselContainer = document.querySelector('.carousel-container');
  if(carouselContainer) {
    carouselContainer.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
    carouselContainer.addEventListener('mouseleave', () => {
      autoplayInterval = setInterval(() => {
        if (currentIndex < slides.length - 1) {
          goToSlide(currentIndex + 1);
        } else {
          goToSlide(0);
        }
      }, 5000);
    });
  }
});
