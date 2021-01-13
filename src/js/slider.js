let sliderPrev = document.querySelector('.slider__move--prev');
let sliderNext = document.querySelector('.slider__move--next');

// Slider prev next/button, show/fade on mouse move
let timeout;

const hidingSliderMoveOnMove = function () {
  hideSides();

  if (timeout !== undefined) {
    window.clearTimeout(timeout);
  }

  timeout = window.setTimeout(function () {
    sliderPrev.style.opacity = 0;
    sliderNext.style.opacity = 0;
  }, 2000);
};

const hideSides = function () {
  if (curSlide === 0) {
    sliderNext.style.opacity = 1;
    sliderPrev.style.opacity = 0;
  }

  if (curSlide === maxSlide) {
    sliderPrev.style.opacity = 1;
    sliderNext.style.opacity = 0;
  }

  if (curSlide !== 0 && curSlide !== maxSlide) {
    sliderPrev.style.opacity = 1;
    sliderNext.style.opacity = 1;
  }
};

document.addEventListener('mousemove', hidingSliderMoveOnMove);

export const makeActive = function (goTo) {
  activeDot(goTo);
  goSlide(goTo);
  curSlide = +goTo;
  makeMenuActive(goTo);
  playAnimations();
};

// Animations handlers

const playAnimations = function () {
  const logo = document.querySelector('.header__logo');
  const headingCenter = document.querySelector('.header__center');
  const headerButtons = document.querySelector('.header__buttons');
  const about = document.querySelector('.about');
  const portfolio = document.querySelector('.portfolio');
  const contact = document.querySelector('.contact');
  const followBox = document.querySelector('.follow-box');

  followBox.style.transform = 'translateY(0)';

  if (curSlide === 0) {
    headingCenter.classList.remove('Grow--off');
    headingCenter.classList.add('Grow--active');

    logo.classList.remove('Ease-top--off');
    logo.classList.add('Ease-ver--active');

    headerButtons.classList.remove('Ease-bottom--off');
    headerButtons.classList.add('Ease-ver--active');
  } else {
    headingCenter.classList.remove('Grow--active');
    headingCenter.classList.add('Grow--off');

    logo.classList.remove('Ease-ver--active');
    logo.classList.add('Ease-top--off');

    headerButtons.classList.remove('Ease-ver--active');
    headerButtons.classList.add('Ease-bottom--off');
  }

  if (curSlide === 1) {
    about.classList.remove('Grow--off');
    about.classList.add('Grow--active');
  } else {
    about.classList.remove('Grow--active');
    about.classList.add('Grow--off');
  }

  if (curSlide === 2) {
    portfolio.classList.remove('Grow--off');
    portfolio.classList.add('Grow--active');
  } else {
    portfolio.classList.remove('Grow--active');
    portfolio.classList.add('Grow--off');
  }

  if (curSlide === 3) {
    contact.classList.remove('Ease-right--off');
    contact.classList.add('Ease-hor--active');
  } else {
    contact.classList.remove('Ease-hor--active');
    contact.classList.add('Ease-right--off');
  }
};

// Generates dots per sections
const dotsBox = document.querySelector('.slider__dots');
const sections = [...document.querySelectorAll('section')];

export const generateDots = function () {
  sections.forEach((_, i) => {
    const markup = `
                    <button class="slider__dot" data-dot="${i}"></button>
                `;

    dotsBox.insertAdjacentHTML('beforeend', markup);
  });
};

const activeDot = function (slide) {
  const dots = [...document.querySelectorAll('.slider__dot')];

  dots.forEach((dot) => {
    dot.classList.remove('slider__dot--active');
  });

  dots.forEach((dot, i) => {
    if (i !== slide) return;
    dot.classList.add('slider__dot--active');
  });
};

const goSlide = function (slideTo) {
  hideSides();

  sections.forEach((slide, i) => {
    slide.style.transform = `translateX(${(i - slideTo) * 100}%)`;
  });
};

// page url
export const pageUrl = function (page) {
  let url;

  if (page === 0) url = '/';
  if (page === 1) url = 'about';
  if (page === 2) url = 'portfolio';
  if (page === 3) url = 'contact';
  return url;
};

// Jump to page by dots
export let curSlide = 0;
export const maxSlide = sections.length - 1;

const goPageByDot = function (e) {
  const btn = e.target.closest('.slider__dot');

  if (!btn) return;

  let { dot } = btn.dataset;
  dot = +dot;
  curSlide = dot;

  makeActive(dot);
};

dotsBox.addEventListener('click', goPageByDot);

// Slider

const slider = document.querySelector('.slider');

const goBackBySlider = function (e) {
  const btn = e.target.closest('.slider__button--prev');

  if (!btn) return;

  if (!curSlide) return;
  curSlide = +curSlide - 1;
  makeActive(curSlide);
};

const goForwardBySlider = function (e) {
  const btn = e.target.closest('.slider__button--next');

  if (!btn) return;

  if (maxSlide !== curSlide) {
    curSlide = +curSlide + 1;
    makeActive(curSlide);
  }
};

slider.addEventListener('click', goForwardBySlider);

slider.addEventListener('click', goBackBySlider);

// page refresh in currentSlide

export const jumpRefresh = async function () {
  try {
    const slides = document.querySelectorAll('.slide');

    let page = await reloadOrRevisit();

    //renderLoading();

    await slides.forEach((slide, i) => {
      slide.style.transition = 'none';
      if (i === page) makeActive(page);
    });

    setTimeout(() => {
      slides.forEach((slide) => {
        slide.style.transition = 'all 2s';
      });
    }, 100);
  } catch (err) {
    console.log(err);
  }
};

export const getTimeInSeconds = function () {
  let seconds = new Date().getTime() / 1000;
  return seconds;
};

// lastLoad more than 600 seconds, then it was a leave
const reloadOrRevisit = function () {
  let page = localStorage.getItem('page');
  let lastLoad = localStorage.getItem('lastLoad');
  let now = new Date().getTime() / 1000;
  let newCurSlide;

  now - lastLoad > 600 ? (newCurSlide = 0) : (newCurSlide = +page);

  curSlide = newCurSlide;
  return newCurSlide;
};

export const navLinks = document.querySelectorAll('.navigation__link');

// on page load active section
const makeMenuActive = function (curSlide) {
  let section = curSlide;

  navLinks.forEach((link) => {
    link.classList.remove('navigation__link--active');
  });

  if (section < 0) section = 0;

  history.pushState({}, 'title', pageUrl(section));

  const activeSection = document.querySelector(`[data-link="${section}"]`);

  activeSection.classList.add('navigation__link--active');

  hidePageButton();
};

export const hidePageButton = function () {
  const prev = document.querySelector('.slider__move-mobile--prev');
  const next = document.querySelector('.slider__move-mobile--next');

  prev.classList.remove('FadeOn');
  next.classList.remove('FadeOn');

  if (curSlide === 0) {
    prev.classList.add('FadeOn');
  }

  if (curSlide === maxSlide) {
    next.classList.add('FadeOn');
  }
};
