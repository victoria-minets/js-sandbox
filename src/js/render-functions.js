// У файлі render - functions.js створи екземпляр SimpleLightbox для роботи
// з модальним вікном та зберігай функції для відображення елементів інтерфейсу:

// createGallery(images).Ця функція повинна приймати масив images, створювати
// HTML - розмітку для галереї, додавати її в контейнер галереї та викликати
// метод екземпляра SimpleLightbox refresh().Нічого не повертає.
//     clearGallery().Ця функція нічого не приймає та повинна очищати вміст контейнера
// галереї.Нічого не повертає.
//     showLoader().Ця функція нічого не приймає, повинна додавати клас для
// відображення лоадера.Нічого не повертає.
//     hideLoader().Ця функція нічого не приймає, повинна прибирати клас для
// відображення лоадера.Нічого не повертає.

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreWrapper = document.querySelector('.load-more-wrapper');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(image => {
      return `
        <li class="gallery-item">
          <a class="gallery-link" href="${image.largeImageURL}">
            <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}" />
          </a>
          <div class="info">
            <div class="info-item">
              <span class="info-item-title">Likes</span>
              <span class="info-item-value">${image.likes}</span>
            </div>
            <div class="info-item">
              <span class="info-item-title">Views</span>
              <span class="info-item-value">${image.views}</span>
            </div>
            <div class="info-item">
              <span class="info-item-title">Comments</span>
              <span class="info-item-value">${image.comments}</span>
            </div>
            <div class="info-item">
              <span class="info-item-title">Downloads</span>
              <span class="info-item-value">${image.downloads}</span>
            </div>
          </div>
        </li>
      `;
    })
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('hidden');
}

export function hideLoader() {
  loader.classList.add('hidden');
}

export function showLoadMoreButton() {
  loadMoreWrapper.classList.remove('hidden');
}

export function hideLoadMoreButton() {
  loadMoreWrapper.classList.add('hidden');
}
