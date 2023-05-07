import axios from 'axios';

async function getPictures(pictureName, page) {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '35752647-f3bb72efc92106ef6393a7805';

    const searchParams = new URLSearchParams({
        key: API_KEY,
        q: pictureName,
        imae_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page: page,
    });
    const URL = `${BASE_URL}?${searchParams}`;
    const response = await axios.get(URL);
    return response;
}

export { getPictures }