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
export { createMarkup }