# javascriptSlideShow
Vanilla JS Slideshow

Built a simple slide show in just JavaScript. It takes an array of string values that need to be urls. It also takes in an html elment as the target location you want the slide show to show up in.

```javascript
const slideShowElement = document.querySelector('.slideshow');
const images = ['images/1.png', 'images/2.jpg', 'images/3.png'];
/**
 * SlideShow
 * @param {node} html element 
 * @param {array} urls 
 */
SlideShow(slideShowElement, images);
```
