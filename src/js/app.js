// prettier-ignore
import { makeActive, generateDots, jumpRefresh, curSlide, maxSlide, pageUrl, navLinks, getTimeInSeconds  } from './slider.js';
import { data, fetchJSON } from './gallery.js';

// responsive menu

const nav = document.querySelector('.navigation');

const oPenNavigationMobile = function (e) {
  const navMobile = document.querySelector('.navigation__mobile');
  const list = document.querySelector('.navigation__list');
  const btn = e.target.closest('.navigation');
  if (!btn || document.documentElement.clientWidth > 900) return;

  list.classList.toggle('GrowFromBottom');
  navMobile.classList.toggle('toggle');
};

nav.addEventListener('click', oPenNavigationMobile);

// menu active state
const navList = document.querySelector('.navigation__list');

const addActiveNavLink = function (e) {
  e.preventDefault();
  const navItem = e.target.closest('.navigation__link');

  if (!navItem) return;

  navLinks.forEach((e) => {
    e.classList.remove('navigation__link--active');
  });

  let { link } = e.target.dataset;
  link = +link;

  makeActive(link);
};

navList.addEventListener('click', addActiveNavLink);

// about add active box
const about = document.querySelector('.slide--2');
const abouts = document.querySelectorAll('.about__box');
const bottomBoxes = document.querySelectorAll('.about__bottom-box');

const addAboutBoxActive = function (e) {
  const box = e.target.closest('.about__box');

  abouts.forEach((e) => {
    e.classList.remove('about__box--active');
  });

  bottomBoxes.forEach((e) => {
    e.classList.remove('FadeIn');
    e.classList.remove('FadeOut');
  });

  if (box && !box.classList.contains('about__box--active')) {
    const bottom = box.querySelector('.about__bottom-box');
    box.classList.add('about__box--active');
    bottom.classList.add('FadeIn');

    abouts.forEach((el) => {
      if (!el.classList.contains('about__box--active')) {
        let bottom = el.querySelector('.about__bottom-box');
        bottom.classList.add('FadeOut');
      }
    });
  }

  if (!box) {
    bottomBoxes.forEach((e) => {
      e.classList.add('FadeOut');
    });
  }
};

about.addEventListener('click', addAboutBoxActive);

// Buttons on home page

const worksButton = document.querySelector('.btn__span--works');
const contactButton = document.querySelector('.btn__span--contact');

const goToPageNumber = function (page, event) {
  const btn = event.target.closest('.btn');

  if (!btn) return;

  makeActive(page);
};

worksButton.addEventListener('click', goToPageNumber.bind(event, 2));

contactButton.addEventListener('click', goToPageNumber.bind(event, 3));

// swipe event

let xDown = null;
let yDown = null;

const getTouches = function (evt) {
  return evt.touches || evt.originalEvent.touches;
};

const handleTouchStart = function (evt) {
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
};

const handleTouchMove = function handleTouchMove(evt) {
  if (!xDown) {
    return;
  }

  let xUp = evt.touches[0].clientX;
  let yUp = evt.touches[0].clientY;

  let xDiff = xDown - xUp;
  let yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    if (xDiff > 0 && curSlide !== maxSlide) {
      makeActive(curSlide + 1);
    }
    if (xDiff < 0 && curSlide !== 0) {
      makeActive(curSlide - 1);
    }
  }

  xDown = null;
  yDown = null;
};

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

window.addEventListener('beforeunload', function () {
  localStorage.setItem(`page`, `${curSlide}`);
  localStorage.setItem(`lastLoad`, getTimeInSeconds());
});

const init = function () {
  fetchJSON();
  generateDots();
  jumpRefresh();

  localStorage.clear();
};

init();
