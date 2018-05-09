
/**
 * slideShow will create a slide show based on images
 * first param is the element you want the slide show to apear in
 * second is an array of pictures you want to use
 * @param {*} element 
 * @param {*} pictures 
 */
function sliderShow(element, pictures) {
    let imageElements;
    let arrowLeft;
    let arrowRight;

    function createArrows() {
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

    function createSlides(){
        pictures.forEach(item => {
            let image = new Image(); //shorthand for document.createElement('img')
            image.src = item;
            image.classList.add('slideshow__image');
            element.appendChild(image);
        });
    }

    createArrows();
    createSlides();

    imageElements = document.querySelectorAll('.slideshow > .slideshow__image');
    arrowLeft = document.querySelector('.slideshow__arrows > .fa-angle-left');
    arrowRight = document.querySelector('.slideshow__arrows > .fa-angle-right');
    console.log(element);
    console.log(arrowLeft);
    console.log(arrowRight);

    arrowLeft.addEventListener('click', (e) => {
        console.log(e);
    });
    arrowRight.addEventListener('click', (e) => {
        console.log(e);
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