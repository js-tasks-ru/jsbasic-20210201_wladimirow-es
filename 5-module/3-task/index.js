function initCarousel() {
  let currentPosition = 0;
  const offset = document.querySelector('.carousel__slide').offsetWidth;
  const maxPosition = -offset * (document.querySelectorAll('.carousel__slide').length - 1);

  const carouselInner = document.querySelector('.carousel__inner');
  const rightArrow = document.querySelector('.carousel__arrow_right');
  const leftArrow = document.querySelector('.carousel__arrow_left');
  leftArrow.style.display = 'none';

  rightArrow.addEventListener('click', () => {
    currentPosition -= offset;
    carouselInner.style.transform = 'translateX(' + currentPosition + 'px)';

    leftArrow.style.display = '';
    if (currentPosition == maxPosition) {
      rightArrow.style.display = 'none';
    }
  });

  leftArrow.addEventListener('click', () => {
    currentPosition += offset;
    carouselInner.style.transform = 'translateX(' + currentPosition + 'px)';

    rightArrow.style.display = '';
    if (currentPosition == 0) {
      leftArrow.style.display = 'none';
    }
  });

}

