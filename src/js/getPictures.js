import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '35752647-f3bb72efc92106ef6393a7805';

function getPictures(pictureName) {

    {// console.log(event);
        // const page = 1;
        // const perPage = 40;
        // const pictureName = document.querySelector('[type ="text"]').value;
        // console.log(searchQuery.value);
    }
    const searchParams = new URLSearchParams({
        key: API_KEY,
        q: pictureName,
        imae_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page: 1,
    });
    const URL = `${BASE_URL}?${searchParams}`;
    return fetch(URL)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json()
        }).then(data => {
            console.log(data);
            // galleryPictures.insertAdjacentHTML('afterbegin', createMarkupImageItem(data.hits));
            // lightbox.refresh();
        });

    // async function getUser() {
    //     try {
    //       const response = await axios.get('/user?ID=12345');
    //       console.log(response);
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   }


}
export { getPictures }