import { data } from './gallery.js';

const portfolio = document.querySelector('.portfolio');
const portfolioBoxes = document.querySelectorAll('.portfolio__box');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const openModal = function () {
  modal.classList.remove('modal--hidden');
  modal.classList.add('modal--visible');
  overlay.classList.remove('overlay--hidden');
  overlay.classList.add('overlay--visible');
};

const closeModal = function () {
  modal.classList.remove('modal--visible');
  modal.classList.add('modal--hidden');
  overlay.classList.remove('overlay--visible');
  overlay.classList.add('overlay--hidden');
};

const modalMarkup = async function (obj) {
  const html = `<div class="modal__left">
                <div class="modal__top">
                <i class="modal__icon modal__icon--top icon-cross"> </i>
                    <h2 class="heading-secondary modal__title">${obj.title}</h2>

                    <div class="modal__description">
                    <p class="modal__paragraph">
                    ${obj.description}
                    </p>
                    </div>
                </div>
                <div class="modal__bottom">
                    <span class="modal__check"> Let's check it!</span>

                    <a target="_blank" href="${obj.demoLink}"
                    ><button class="btn btn__submit-button">demo</button></a
                    >
                </div>
                </div>
                <div class="modal__right">
                
                </div>`;

  await modal.insertAdjacentHTML('afterbegin', html);

  loadingImage(obj);

  /* <i class="modal__icon modal__icon--bottom icon-cross"> </i>
                <img class="modal__image" src="${obj.imageUrl}" alt="${
    obj.title
  }" />*/
};

const openModalOnClick = function (e) {
  const box = e.target.closest('.portfolio__box');

  if (!box) return;

  const { id } = box.dataset;

  modal.innerHTML = '';
  data.forEach((obj) => (obj.id === +id ? modalMarkup(obj) : ''));

  openModal();
};

portfolio.addEventListener('click', openModalOnClick);

const closeModalOnClick = function (e) {
  const box = e.target.classList.contains('modal__icon');

  if (!box) return;

  closeModal();
};

const closeOnEsc = function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('modal--hidden')) {
    closeModal();
  }
};

modal.addEventListener('click', closeModalOnClick);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', closeOnEsc);

const loadingImage = function (obj) {
  const parentElement = document.querySelector('.modal__right');

  loadingSpinner(parentElement);

  const image = document.createElement('img');
  image.src = `${obj.imageUrl}`;
  image.alt = `${obj.title}`;
  image.className = 'modal__image';
  image.onload = function () {
    parentElement.innerHTML = '';
    let markup = `<i class="modal__icon modal__icon--bottom icon-cross"> </i>`;
    parentElement.insertAdjacentHTML('afterbegin', markup);
    parentElement.append(this);
  };
};

const loadingSpinner = function (parentElement) {
  const markup = `
                  <div class="lds-default">
                    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                  </div>
`;
  parentElement.innerHTML = '';
  parentElement.insertAdjacentHTML('afterbegin', markup);
};
