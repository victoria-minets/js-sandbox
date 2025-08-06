// У файлі main.js напиши всю логіку роботи додатка.Виклики нотифікацій
// iziToast, усі перевірки на довжину масиву в отриманій відповіді робимо
// саме в цьому файлі.Імпортуй в нього функції із файлів pixabay - api.js
// та render - functions.js та викликай їх у відповідний момент.

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'loaders.css/loaders.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more-btn');

let currentPage = 1;
let currentQuery = '';
let totalImagesLoaded = 0;

form.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', handleLoadMore);

async function handleSubmit(event) {
  event.preventDefault();

  const query = form.elements['search-text'].value.trim();
  const submitButton = form.querySelector('.btn');

  if (!query) {
    onWarning('Please enter search query');
    return;
  }

  //  скидання стану
  currentPage = 1;
  totalImagesLoaded = 0;
  currentQuery = query;
  submitButton.disabled = true;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, currentPage);

    if (!data.hits || data.hits.length === 0) {
      onError(
        'Sorry, there are no images matching <br>your search query. Please try again!'
      );
      return;
    }

    createGallery(data.hits);
    totalImagesLoaded += data.hits.length;

    if (totalImagesLoaded < data.totalHits) {
      showLoadMoreButton();
    } else {
      showEndOfResults();
    }
  } catch (error) {
    onError('Failed to fetch data from API. <br>Please try again later.');
  } finally {
    submitButton.disabled = false;
    hideLoader();
  }
}

async function handleLoadMore() {
  currentPage += 1;
  hideLoadMoreButton();
  showLoader();
  loadMoreBtn.disabled = true;

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    if (data.hits.length > 0) {
      createGallery(data.hits);
      smoothScrollAfterLoad();
      totalImagesLoaded += data.hits.length;

      if (totalImagesLoaded < data.totalHits) {
        showLoadMoreButton();
      } else {
        showEndOfResults();
      }
    } else {
      showEndOfResults();
    }
  } catch (error) {
    onError('Failed to fetch more images. <br>Please try again later.');
  } finally {
    hideLoader();
    loadMoreBtn.disabled = false;
  }
}

function showEndOfResults() {
  onWarning("We're sorry, but you've reached the end of search results.");
}

function onError(message) {
  iziToast.error({
    message: message,
    backgroundColor: '#ef4040',
    messageColor: '#fff',
    position: 'topRight',
  });
}

function onWarning(message) {
  iziToast.warning({
    message: message,
    backgroundColor: '#ffa000',
    messageColor: '#fff',
    position: 'topRight',
  });
}

function smoothScrollAfterLoad() {
  const gallery = document.querySelector('.gallery');
  const card = gallery.querySelector('.gallery-item');

  if (card) {
    const cardHeight = card.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}
