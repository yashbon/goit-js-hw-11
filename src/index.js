
import SimpleLightbox from "simplelightbox"; // Описаний в документації
import "simplelightbox/dist/simple-lightbox.min.css"; // Додатковий імпорт стилів
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';

const form = document.querySelector('.search-form');
const galleryPictures = document.querySelector('.gallery');
const guard = document.createElement('div');
guard.classList.add('guard');

document.querySelector('[type ="text"]').focus();

let lightbox = new SimpleLightbox('.gallery .gallery__link')

const options = {
    root: null,
    rootMargin: '500px',
    threshold: 0,
}
const observer = new IntersectionObserver(onPagination, options)
let pictureName = '';
let page = 1;
let totalPages = 0;
document.body.appendChild(guard);

form.addEventListener('submit', onSubmit);

function onSubmit(event) {
    event.preventDefault();
    pictureName = document.querySelector('[type ="text"]').value.trim();
    page = 1;
    galleryPictures.innerHTML = '';

    if (!pictureName) {
        Notify.failure('Please, enter a search query');
        galleryPictures.innerHTML = '';
    } else {
        getPictures(pictureName, page);
    }
}

function createMarkup(imagesArray) {
    return imagesArray.map(({ likes, webformatURL, views, comments, downloads, largeImageURL, tags }) => `

        <a class="gallery__link" href="${largeImageURL}">
        <div class="photo-card">
            <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" width="320" height="212"/>
            <div class="info" style = "display: flex; gap: 10px;">
            <p class="info-item" style = "display: block">
                <b>Likes </b><span style = "display: block">${likes}</span>
            </p>
            <p class="info-item" >
                <b>Views </b><span style = "display: block">${views}</span>
            </p>
            <p class="info-item" >
                <b>Comments </b><span style = "display: block">${comments}</span>
            </p>
            <p class="info-item" >
                <b>Downloads </b><span style = "display: block">${downloads}</span>
            </p>
            </div>
        </div>
        </a>

    `).join('');
}

async function getPictures(pictureName, page) {
    if (!pictureName) { return }
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

    if (page === 1) {
        totalPages = Math.round(response.data.totalHits / 40);

        if (!response.status === 200) {
            throw new Error(response.statusText);
        }

        if (!response.data.totalHits) {
            galleryPictures.innerHTML = '';
            Notify.failure(
                'Sorry, there are no images matching your search query. Please try again.'
            )
        } else {
            Notify.success(
                `Hooray! We found ${response.data.totalHits} images.`
            );
            observer.observe(guard);
        }
    }

    galleryPictures.insertAdjacentHTML('beforeend', createMarkup(response.data.hits));

    if (response.data.hits.length > 0) {
        lightbox.refresh();
    }

    if (page > 2) { scroll() };

    if (page === totalPages) {
        Notify.warning(
            "We're sorry, but you've reached the end of search results."
        );
    }
}

function onPagination(entries, observer) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            page += 1;
            getPictures(pictureName, page);
            if (page === totalPages) {
                observer.unobserve(guard)
            }
        }
    });
}

function scroll() {
    const { height: cardHeight } = document
        .querySelector(".gallery")
        .firstElementChild.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
    });
}
