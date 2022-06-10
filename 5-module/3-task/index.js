function initCarousel() {
  const arrowLeft = document.querySelector('.carousel__arrow_left');
  const arrowRight = document.querySelector('.carousel__arrow_right');

  const containerSlides = document.querySelector('.carousel__inner');
  const slides = containerSlides.querySelectorAll('.carousel__slide');
  const slidesCount = slides.length;
  console.log(slidesCount);

  const widthSlide = containerSlides.offsetWidth;

  let count = 0;
  let currentIndex = 0;

  arrowLeft.style.display = 'none';

  arrowRight.addEventListener('click', function() {
    count += widthSlide;
    currentIndex++;
    console.log(currentIndex);
    containerSlides.style.transform = `translateX(-${count}px)`;
    if (currentIndex >= slidesCount - 1) {
      arrowRight.style.display = 'none';
    }
    arrowLeft.style.display = 'flex';
  });


  arrowLeft.addEventListener('click', function() {
    count -= widthSlide;
    currentIndex--;
    containerSlides.style.transform = `translateX(-${count}px)`;
    if (currentIndex <= 0) {
      arrowLeft.style.display = 'none';
    }
    arrowRight.style.display = 'flex';
  });
}
