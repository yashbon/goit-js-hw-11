// const options = {
//     root: null,
//     rootMargin: '500px',
//     threshold: 0,
// }
// const observer = new IntersectionObserver(onPagination, options)
// function onPagination(entries, observer) {
//     entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//             page += 1;
//             getPictures(pictureName, page);
//             if (page === totalPages) {
//                 observer.unobserve(guard)
//             }
//         }
//     });
// }

function scroll() {
    const { height: cardHeight } = document
        .querySelector(".gallery")
        .firstElementChild.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
    });
}

export { scroll }