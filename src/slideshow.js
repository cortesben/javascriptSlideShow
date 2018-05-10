/**
 * Creates Arrows
 * creates a left arrow
 * creates a right arrow
 * appends to slideshow element node passed in
 * @param {node} element 
 */
function createArrows(element) {
    // arrow container
    let arrowsContainer = document.createElement('div');
    arrowsContainer.classList.add('slideshow__arrows');

    // left Arrow
    let arrowLeft = document.createElement('i');
    arrowLeft.classList.add('fas');
    arrowLeft.classList.add('fa-angle-left');
    arrowsContainer.appendChild(arrowLeft);

    // right Arrow
    let arrowRight = document.createElement('i');
    arrowRight.classList.add('fas');
    arrowRight.classList.add('fa-angle-right');
    arrowsContainer.appendChild(arrowRight);

    // add to sliderShow
    element.appendChild(arrowsContainer);
}

/**
 * Creates an img elment for each item in images array
 * appends to slideshow element node passed in
 * @param {node} element 
 * @param {array} pictures 
 */
function createSlides(element, pictures) {
    pictures.forEach(item => {
        let image = new Image(); //shorthand for document.createElement('img')
        image.src = item;
        image.classList.add('slideshow__image');
        element.appendChild(image);
    });
}

function createMarkers(element, pictures) {
    let markerContainer = document.createElement('div');
    markerContainer.classList.add('slideshow__markers');
    pictures.forEach(item => {
        let dot = document.createElement('div');
        dot.classList.add('slideshow__markers-dot');
        markerContainer.appendChild(dot);
    });
    element.appendChild(markerContainer);
}
/**
 * slideShow will create a slide show based on images
 * first param is the element you want the slide show to apear in
 * second is an array of pictures you want to use
 * @param {*} element 
 * @param {*} pictures 
 */
function sliderShow(element, pictures) {

    createArrows(element);
    createSlides(element, pictures);
    createMarkers(element, pictures);

    // select new elements
    const imageElements = document.querySelectorAll('.slideshow__image');
    const markerElements = document.querySelectorAll('.slideshow__markers-dot');
    const arrowLeft = document.querySelector('.slideshow__arrows > .fa-angle-left');
    const arrowRight = document.querySelector('.slideshow__arrows > .fa-angle-right');

    let active = null;
    let previous = null;
    let next = null;
    let lastIndex = null;
    let isEndOfList = null;
    let isStartOfList = null;

    let state = {
        slideShow: {
            active: 'slideshow__image--active',
            previous: 'slideshow__image--previous',
            next: 'slideshow__image--next'
        },
        markers: {
            active: 'slideshow__markers-dot--active'
        }
    }

    function startListCount() {
        active = 0;
        previous = active - 1;
        next = active + 1;

        imageElements[active].classList.add(state.slideShow.active);
        imageElements[next].classList.add(state.slideShow.next);

        markerElements[active].classList.add(state.markers.active);

        lastIndex = imageElements.length - 1;
    }

    startListCount();

    function setListStartEnd() {
        isStartOfList = imageElements[0].classList.contains(state.slideShow.active);
        isEndOfList = imageElements[lastIndex].classList.contains(state.slideShow.active);
    }

    function moveItem(direction) {

        // remove state
        imageElements[active].classList.remove(state.slideShow.active);
        markerElements[active].classList.remove(state.markers.active);

        if (!isStartOfList) {
            imageElements[previous].classList.remove(state.slideShow.previous);
        }

        if (!isEndOfList) {
            imageElements[next].classList.remove(state.slideShow.next);
        }

        /**
         * set active
         * set previous
         * set next
         */
        active = active + direction;
        previous = active - 1;
        next = active + 1;

        imageElements[active].classList.add(state.slideShow.active);
        markerElements[active].classList.add(state.markers.active);

        // after we set active we check to see what part of the list we are in
        setListStartEnd();

        if (!isStartOfList) {
            imageElements[previous].classList.add(state.slideShow.previous);
        }

        if (!isEndOfList) {
            imageElements[next].classList.add(state.slideShow.next);
        }


        console.log(imageElements[active]);
    }

    /** Move left */
    arrowLeft.addEventListener('click', (e) => {
        setListStartEnd();

        if (isStartOfList) { return; }

        moveItem(-1);

    });

    /** Move right */
    arrowRight.addEventListener('click', (e) => {
        setListStartEnd();

        if (isEndOfList) { return; }

        moveItem(+1)

    });
}

const images = [
    `https://drscdn.500px.org/photo/255501013/q%3D80_m%3D1000/v2?webp=true&sig=0294efd39ac9533f89b8a1d5cbe9ad27515ad155bafc3b8d2247a8bc8469a53f`,

    `https://drscdn.500px.org/photo/252057477/q%3D80_m%3D2000_k%3D1/v2?webp=true&sig=02a3fe5a928aadb8f20cf0096221eae280ed857398b4b02b7b97fa7823bf2f1f`,

    `https://drscdn.500px.org/photo/228515001/q%3D80_m%3D2000_k%3D1/v2?webp=true&sig=61528ad3b1fcce1e795fe84d161b974f47fe241ae2b34cff478c88215e032935`,

    `https://drscdn.500px.org/photo/228507937/q%3D80_m%3D1000/v2?webp=true&sig=da914fd34565e2602934c98cf7a690edb23e36958195e0437fba37a83730ffad`,

    `https://drscdn.500px.org/photo/224672447/q%3D80_m%3D2000/v2?webp=true&sig=5feda356289ea65bb319f198cfca1334acc01658fa9dc68cd8d331d3ad4982ed`,

    `https://drscdn.500px.org/photo/221493077/q%3D80_m%3D2000_k%3D1/v2?webp=true&sig=291d3acc9287ee2a483069897faa6802bba7db88b5dc6cf8ea37c64569f6ecaf`,

    `https://drscdn.500px.org/photo/214727293/q%3D80_m%3D2000/v2?webp=true&sig=308c7196be21aede3a7a115eab4ed44253b034bcb5ac14db6c8389cc8442fdc9`,
]


document.addEventListener("DOMContentLoaded", (event) => {
    const slideShowElement = document.querySelector('.slideshow');
    sliderShow(slideShowElement, images);
});