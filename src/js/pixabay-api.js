'use strict';

import axios from 'axios';

export const getImages = async (searchCategory, page) => {
  const BASE_URL = 'https://pixabay.com/api/';
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: '44070082-fd53ee46a47d37a3fc9d7b56d',
        q: searchCategory,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: '15',
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
