import '././sass/my_styles.scss';

import SimpleLightbox from "simplelightbox"; // Описаний в документації
import "simplelightbox/dist/simple-lightbox.min.css"; // Додатковий імпорт стилів
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { createMarkup } from "./js/createMarkup";
import { getPictures } from "./js/getPictures";
import { scroll } from './js/scroll';

const form = document.querySelector('.search-form');
const galleryPictures = document.querySelector('.gallery');
const guard = document.createElement('div');
guard.classList.add('guard');

document.querySelector('[type ="text"]').focus();

let lightbox = new SimpleLightbox('.gallery .gallery__link');

const options = {
    root: null,
    rootMargin: '500px',
    threshold: 0,
}
const observer = new IntersectionObserver(onPagination, options);
let pictureName = '';
let page = 1;
let totalPages = 0;

document.body.appendChild(guard);

form.addEventListener('submit', onSubmit);

function onSubmit(event) {
    event.preventDefault();
    pictureName = document.querySelector('[type ="text"]').value.trim();
    page = 1;

    if (observer) {
        observer.unobserve(guard)
    }
    galleryPictures.innerHTML = '';

    if (!pictureName) {
        Notify.failure('Please, enter a search query');
        galleryPictures.innerHTML = '';
        return;
    }

    addPicturesToGallery();
}

async function addPicturesToGallery() {

    try {
        if (page > 1) { scroll() };

        const response = await getPictures(pictureName, page);
        if (!response.data.totalHits) {
            galleryPictures.innerHTML = '';
            Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            return;
        }

        galleryPictures.insertAdjacentHTML('beforeend', createMarkup(response.data.hits));
        lightbox.refresh();

        if (page === 1) {
            totalPages = Math.round(response.data.totalHits / 40);
            Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
            observer.observe(guard);
        }
        if (page === totalPages) {
            Notify.warning("We're sorry, but you've reached the end of search results.");
        }
    }
    catch (error) {
        console.log(error.message);
        const errMessage = error.message;
        Notify.failure(errMessage);
    }
}

function onPagination(entries, observer) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            page += 1;
            addPicturesToGallery()
            if (page === totalPages) {
                observer.unobserve(guard)
            }
        }
    })
}
