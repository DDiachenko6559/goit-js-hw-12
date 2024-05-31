import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getImages } from './js/pixabay-api.js';
import { GalleryItem } from './js/render-functions.js';

const queryEl = {
  galleryEl: document.querySelector(`.gallery-list`),
  loader: document.querySelector(`.loader`),
  searchForm: document.querySelector(`.form`),
};

const lightbox = new SimpleLightbox('.gallery-link', {
  captionsData: 'alt',
  captionDelay: 250,
});

queryEl.searchForm.addEventListener(`submit`, e => {
  e.preventDefault();
  queryEl.loader.style.display = 'inline-block';

  const searchQuery = e.target.elements.search.value.trim();
  if (searchQuery === '') {
    queryEl.galleryEl.innerHTML = '';
    e.target.reset();
    iziToast.warning({
      title: `Warning`,
      message: 'Search field cannot be empty!',
      position: 'topRight',
    });
    return;
  }

  queryEl.galleryEl.innerHTML = '';

  getImages(searchQuery)
    .then(imagesData => {
      if (!imagesData.total) {
        iziToast.error({
          title: `Error`,
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
      }
      queryEl.galleryEl.innerHTML = GalleryItem(imagesData.hits);
      lightbox.refresh();
    })
    .catch(error => console.log(error))
    .finally(() => {
      queryEl.loader.style.display = 'none';
      e.target.reset();
    });
});
