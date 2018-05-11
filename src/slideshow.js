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
        let image = new Image();
        image.src = item;
        image.classList.add('slideshow__image');
        element.appendChild(image);
    });
}

/**
 * Create markers that match the amount of images 
 * @param {node} element 
 * @param {array} pictures 
 */
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
 * first param is the element you want the slide show to apear in of
 * second is an array of pictures you want to use
 * @param {node} element 
 * @param {array} pictures 
 */
function SlideShow(element, pictures) {

    /**
     * Create all HTML elements for slide show
     */
    createArrows(element);
    createSlides(element, pictures);
    createMarkers(element, pictures);

    /**
     * Get all selectors we will be using
     */
    const s_imageElements = document.querySelectorAll('.slideshow__image');
    const s_markerElements = document.querySelectorAll('.slideshow__markers-dot');
    const s_arrowLeft = document.querySelector('.fa-angle-left');
    const s_arrowRight = document.querySelector('.fa-angle-right');
    const s_dotElements = document.querySelectorAll('.slideshow__markers-dot');

    /**
     * Group of all variables we need for our photo slider
     */
    let active = null;
    let previous = null;
    let next = null;
    let lastIndex = null;
    let isEndOfList = null;
    let isStartOfList = null;

    /**
     * Object of classes we will be writing to elements to set state of slider
     */
    let state = {
        slideShow: {
            active: 'slideshow__image--active',
            previous: 'slideshow__image--previous',
            next: 'slideshow__image--next'
        },
        markers: {
            active: 'slideshow__markers-dot--active'
        },
        arrow: {
            deactivate: 'arrow--deactivate'
        }
    }

    /**
     * sets the list start and end
     * also sets classes on arrow so they show or dont show
     */
    function setListStartEnd() {
        isStartOfList = s_imageElements[0].classList.contains(state.slideShow.active);
        isEndOfList = s_imageElements[lastIndex].classList.contains(state.slideShow.active);

        if (isStartOfList) {
            s_arrowLeft.classList.add(state.arrow.deactivate);
        } else {
            if (s_arrowLeft.classList.contains(state.arrow.deactivate)) {
                s_arrowLeft.classList.remove(state.arrow.deactivate);
            }
        }

        if (isEndOfList) {
            s_arrowRight.classList.add(state.arrow.deactivate);
        } else {
            if (s_arrowRight.classList.contains(state.arrow.deactivate)) {
                s_arrowRight.classList.remove(state.arrow.deactivate);
            }
        }

    }

    /**
     * Setting list defaults such as active, next and previous
     */
    function startListCount() {
        active = 0;
        previous = active - 1;
        next = active + 1;

        s_imageElements[active].classList.add(state.slideShow.active);
        s_imageElements[next].classList.add(state.slideShow.next);
        s_markerElements[active].classList.add(state.markers.active);

        lastIndex = s_imageElements.length - 1;
    }

    startListCount();
    setListStartEnd();

    /**
     * remove states on elements
     */
    function removeState() {

        s_imageElements.forEach(image => {
            let activeElement = image.classList.contains(state.slideShow.active);
            if (activeElement) {
                image.classList.remove(state.slideShow.active);
            }
        });

        s_markerElements.forEach(dot => {
            let activeElement = dot.classList.contains(state.markers.active);
            if (activeElement) {
                dot.classList.remove(state.markers.active);
            }
        });

        if (!isStartOfList) {
            s_imageElements[previous].classList.remove(state.slideShow.previous);
        }

        if (!isEndOfList) {
            s_imageElements[next].classList.remove(state.slideShow.next);
        }
    }

    /**
     * add state on elements
     */
    function addState() {
        s_imageElements[active].classList.add(state.slideShow.active);
        s_markerElements[active].classList.add(state.markers.active);

        // after we set active state we check to see what part of the list we are in
        setListStartEnd();

        if (!isStartOfList) {
            s_imageElements[previous].classList.add(state.slideShow.previous);
        }

        if (!isEndOfList) {
            s_imageElements[next].classList.add(state.slideShow.next);
        }
    }

    /**
     * passing in a number will let us go up or down our list
     * +1 up list
     * -1 down list
     * @param {number} direction 
     */
    function setActiveItem(direction) {
        removeState();
        active = active + direction;
        previous = active - 1;
        next = active + 1;
        addState();
    }

    /** Move left */
    s_arrowLeft.addEventListener('click', function () {
        setListStartEnd();
        if (isStartOfList) { return; }
        setActiveItem(-1);
    });

    /** Move right */
    s_arrowRight.addEventListener('click', function () {
        setListStartEnd();
        if (isEndOfList) { return; }
        setActiveItem(+1)
    });

    /** Using Dot markers choose correct item on list */
    s_dotElements.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            active = index - 1;
            setActiveItem(1);
        })
    });
};

const images = [
    `https://drscdn.500px.org/photo/255501013/q%3D80_m%3D1000/v2?webp=true&sig=0294efd39ac9533f89b8a1d5cbe9ad27515ad155bafc3b8d2247a8bc8469a53f`,
    `https://drscdn.500px.org/photo/252057477/q%3D80_m%3D2000_k%3D1/v2?webp=true&sig=02a3fe5a928aadb8f20cf0096221eae280ed857398b4b02b7b97fa7823bf2f1f`,
    `https://drscdn.500px.org/photo/228515001/q%3D80_m%3D2000_k%3D1/v2?webp=true&sig=61528ad3b1fcce1e795fe84d161b974f47fe241ae2b34cff478c88215e032935`,
    `https://drscdn.500px.org/photo/228507937/q%3D80_m%3D1000/v2?webp=true&sig=da914fd34565e2602934c98cf7a690edb23e36958195e0437fba37a83730ffad`,
    `https://drscdn.500px.org/photo/224672447/q%3D80_m%3D2000/v2?webp=true&sig=5feda356289ea65bb319f198cfca1334acc01658fa9dc68cd8d331d3ad4982ed`,
    `https://drscdn.500px.org/photo/221493077/q%3D80_m%3D2000_k%3D1/v2?webp=true&sig=291d3acc9287ee2a483069897faa6802bba7db88b5dc6cf8ea37c64569f6ecaf`,
    `https://drscdn.500px.org/photo/214727293/q%3D80_m%3D2000/v2?webp=true&sig=308c7196be21aede3a7a115eab4ed44253b034bcb5ac14db6c8389cc8442fdc9`,
];

document.addEventListener("DOMContentLoaded", () => {
    const slideShowElement = document.querySelector('.slideshow');
    /**
     * SlideShow
     * @param {node} html element 
     * @param {array} urls 
     */
    SlideShow(slideShowElement, images);
});