export const getImages = searchCategory => {
  const apiKey = '44070082-fd53ee46a47d37a3fc9d7b56d';
  const BASE_URL = 'https://pixabay.com/api/';
  const params = new URLSearchParams({
    key: apiKey,
    q: searchCategory,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  const url = `${BASE_URL}?${params}`;

  return fetch(url).then(res => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  });
};
