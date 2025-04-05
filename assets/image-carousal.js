document.addEventListener('DOMContentLoaded', function () {
  const allProductsContainers = document.querySelectorAll(`.shop-the-look , .product-grid , .collage`);
  allProductsContainers.forEach((productContainer) => {
    productContainer.addEventListener('click', function (event) {
      const arrow = event.target;

      if (arrow.classList.contains('right-arrow') || arrow.closest('.right-arrow')) {
        const mediaWrapper = arrow.closest('.media');
        changeFirstImage(mediaWrapper, false);
      } else if (arrow.classList.contains('left-arrow') || arrow.closest('.left-arrow')) {
        const mediaWrapper = arrow.closest('.media');
        changeFirstImage(mediaWrapper, true);
      }
    });
  });
});

function changeFirstImage(mediaWrapper, back) {
  if (mediaWrapper) {
    const allImages = mediaWrapper.querySelectorAll('img');
    const selectedImage = mediaWrapper.querySelector('img.selected');

    //update the index to be the next\previous one
    let selectedIndex = Array.from(allImages).indexOf(selectedImage);
    if (selectedIndex == -1) {
      selectedIndex = 0;
    }
    if (back) {
      selectedIndex = selectedIndex - 1;
      if (selectedIndex == -1) {
        selectedIndex = Array.from(allImages).length - 1;
      }
    } else {
      selectedIndex = selectedIndex + 1;
      if (selectedIndex == Array.from(allImages).length) {
        selectedIndex = 0;
      }
    }

    //update selected classes
    allImages[selectedIndex].classList.add('selected');
    if (selectedImage) {
      selectedImage.classList.remove('selected');
    }

    console.log(allImages[selectedIndex]);
  }
}
