'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getImages } from './js/pixabay-api.js';
import { GalleryItem } from './js/render-functions.js';

const queryEl = {
  galleryEl: document.querySelector(`.gallery-list`),
  galleryItem: document.querySelector(`.gallery-item`),
  searchForm: document.querySelector(`.form`),
  searchBtn: document.querySelector('.search-btn'),
  loader: document.querySelector(`.loader`),
  loadBtn: document.querySelector(`.load-more-btn`),
};

let page = 1;
let totalHits = 0;
let globalSearchCategory;

queryEl.searchForm.addEventListener(`submit`, galleryOn);
queryEl.loadBtn.addEventListener('click', handleLoad);

async function galleryOn(e) {
  e.preventDefault();
  loaderShow();

  queryEl.galleryEl.innerHTML = '';

  const searchCategory = e.target.elements.search.value.trim();
  globalSearchCategory = searchCategory;
  if (!searchCategory) {
    queryEl.galleryEl.innerHTML = '';
    e.target.reset();
    return;
  }

  try {
    const imagesData = await getImages(searchCategory, (page = 1));
    if (imagesData.hits.length) {
      queryEl.galleryEl.innerHTML = GalleryItem(imagesData.hits);
      lightbox.refresh();
      totalHits = Math.ceil(imagesData.totalHits / 15);
      if (page < totalHits) {
        visibilityLoad();
      } else {
        hiddenLoad();
        iziToast.error({
          message: "We're sorry, but you've reached the end of search results.",
          backgroundColor: '#EF4040',
          theme: 'dark',
          maxWidth: 354,
          messageSize: '16',
        });
      }
    } else {
      hiddenLoad();
      throw new Error(
        'Sorry, there are no images matching your search query. Please try again!'
      );
    }
  } catch (error) {
    iziToast.error({
      message: error.message,
      position: 'topRight',
      backgroundColor: '#EF4040',
      theme: 'dark',
      maxWidth: 354,
      messageSize: '16',
    });
  } finally {
    loaderHide();
    e.target.reset();
  }
}

async function handleLoad() {
  page += 1;
  hiddenLoad();
  loaderShow();

  try {
    const imagesData = await getImages(globalSearchCategory, page);
    if (imagesData.hits.length) {
      queryEl.galleryEl.insertAdjacentHTML(
        'beforeend',
        GalleryItem(imagesData.hits)
      );
      lightbox.refresh();

      if (queryEl.galleryEl) {
        smoothScrollByTwoCardHeights();
      } else {
        console.error("Element 'galleryItem' is not found.");
      }
      totalHits = Math.ceil(imagesData.totalHits / 15);
      if (page < totalHits) {
        visibilityLoad();
      }
    }
  } catch (error) {
    hiddenLoad();
    iziToast.error({
      message: "We're sorry, but you've reached the end of search results.",
      backgroundColor: '#EF4040',
      theme: 'dark',
      maxWidth: 354,
      messageSize: '16',
    });
  } finally {
    loaderHide();
  }
}

const lightbox = new SimpleLightbox('.gallery-link', {
  captionsData: 'alt',
  captionDelay: 250,
  className: 'modal-image',
});

function loaderShow() {
  queryEl.loader.style.display = 'inline-block';
}

function loaderHide() {
  queryEl.loader.style.display = 'none';
}

function visibilityLoad() {
  queryEl.loadBtn.classList.remove('hidden');
}

function hiddenLoad() {
  queryEl.loadBtn.classList.add('hidden');
}

function getCardHeight() {
  const card = queryEl.galleryEl.firstChild;
  const cardRect = card.getBoundingClientRect();
  return cardRect.height;
}

function smoothScrollByTwoCardHeights() {
  const cardHeight = getCardHeight();
  window.scrollBy({
    left: 0,
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
