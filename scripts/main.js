const testimonialSlider = document.querySelector('.testimonials');

if (testimonialSlider) {
  const slides = [...testimonialSlider.querySelectorAll('.testimonial-slide')];
  const previousButton = testimonialSlider.querySelector('.testimonial-prev');
  const nextButton = testimonialSlider.querySelector('.testimonial-next');
  const count = testimonialSlider.querySelector('.testimonial-count');
  const dotsContainer = testimonialSlider.querySelector('.testimonial-dots');
  let currentSlide = 0;
  let rotationTimer;

  const dots = slides.map((_, index) => {
    const button = document.createElement('button');
    button.className = 'testimonial-dot';
    button.type = 'button';
    button.setAttribute('aria-label', `Show testimonial ${index + 1}`);
    button.addEventListener('click', () => showSlide(index));
    dotsContainer.appendChild(button);
    return button;
  });

  function showSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.hidden = slideIndex !== currentSlide;
      dots[slideIndex].setAttribute('aria-current', slideIndex === currentSlide ? 'true' : 'false');
    });
    count.textContent = `${currentSlide + 1} / ${slides.length}`;
  }

  function startRotation() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    clearInterval(rotationTimer);
    rotationTimer = setInterval(() => showSlide(currentSlide + 1), 4000);
  }

  previousButton.addEventListener('click', () => {
    showSlide(currentSlide - 1);
    startRotation();
  });
  nextButton.addEventListener('click', () => {
    showSlide(currentSlide + 1);
    startRotation();
  });
  testimonialSlider.addEventListener('mouseenter', () => clearInterval(rotationTimer));
  testimonialSlider.addEventListener('mouseleave', startRotation);
  testimonialSlider.addEventListener('focusin', () => clearInterval(rotationTimer));
  testimonialSlider.addEventListener('focusout', startRotation);

  showSlide(0);
  startRotation();
}
