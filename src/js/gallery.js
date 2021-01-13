const galleryBox = document.querySelector('.portfolio');

export let data;
export const fetchJSON = async function () {
  await fetch('../../src/dev-data/data.json')
    .then((response) => response.json())
    .then((dataObj) => (data = dataObj));

  data.forEach((obj) => renderMarkup(obj));
};

const renderMarkup = function (obj) {
  const html = `
                <div class="portfolio__box portfolio__box--${obj.titleShort}" data-id="${obj.id}">
                ${
                  obj.backgroundUrl
                    ? `<img class="portfolio__background portfolio__background--${obj.titleShort}" src="${obj.backgroundUrl}"
                    alt="${obj.title}"/>`
                    : ''
                }



                ${
                  obj.logoUrl
                    ? `<img
                    class="portfolio__logo portfolio__logo--${obj.titleShort}"
                    src="${obj.logoUrl}"
                    alt="${obj.title}"
                />`
                    : ''
                }
                </div>
            `;

  galleryBox.insertAdjacentHTML('beforeEnd', html);
};
