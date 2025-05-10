document.addEventListener('DOMContentLoaded', function () {
  const allProductsContainers = document.querySelectorAll(
    `.shop-the-look , .product-grid , .collage , .related-products`
  );
  allProductsContainers.forEach((productsContainer) => {
    //load images on mouse enter (with offset)
    productsContainer.addEventListener('mousemove', (e) => {
      let productCard = event.target;
      if (productCard.classList.contains('card-wrapper')) {
        productCard = productCard;
      } else if (productCard.closest('.card-wrapper')) {
        productCard = productCard.closest('.card-wrapper');
      } else {
        return;
      }

      if (!productCard.classList.contains('carousal-images-loaded')) {
        productCard.classList.add('carousal-images-loaded');
        const carousalContainer = productCard.querySelector('.carousal');
        const productCarousalMedia = JSON.parse(carousalContainer?.dataset.media);
        const productCarousalMaxImages = JSON.parse(carousalContainer.dataset.maxImages);
        const pageWidth = JSON.parse(carousalContainer.dataset.pageWidth);
        const mediaContainer = productCard.querySelector('.media');

        for (let index in productCarousalMedia) {
          if (index != 0 && index < productCarousalMaxImages) {
            const imageSrcset = buildSrcset(productCarousalMedia[index]['src']);
            const imageSrc = productCarousalMedia[index]['src'].indexOf('?')
              ? productCarousalMedia[index]['src'] + '&width=533'
              : productCarousalMedia[index]['src'] + '?width=533';

            const imageElement = document.createElement('img');
            imageElement.alt = productCarousalMedia[index]['alt'];
            imageElement.classList.add('motion-reduce');
            imageElement.classList.add('carousal_image');
            imageElement.width = productCarousalMedia[index]['width'];
            imageElement.height = productCarousalMedia[index]['height'];
            imageElement.loading = 'lazy';
            imageElement.srcset = imageSrcset;
            imageElement.src = imageSrc;
            imageElement.sizes = `(min-width: ${pageWidth}px) ${
              (pageWidth - 130) / 4
            }px, (min-width: 990px) calc((100vw - 130px) / 4), (min-width: 750px) calc((100vw - 120px) / 3), calc((100vw - 35px) / 2)`;

            mediaContainer.appendChild(imageElement);
          }
        }
      }
    });

    //arrows click events
    productsContainer.addEventListener('click', function (event) {
      const arrow = event.target;

      if (arrow.classList.contains('right-arrow') || arrow.closest('.right-arrow')) {
        const mediaWrapper = arrow.closest('.media');
        changeImage(mediaWrapper, false);
      } else if (arrow.classList.contains('left-arrow') || arrow.closest('.left-arrow')) {
        const mediaWrapper = arrow.closest('.media');
        changeImage(mediaWrapper, true);
      }
    });
  });
});

function changeImage(mediaWrapper, back) {
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
  }
}

function buildSrcset(imageUrl) {
  const widths = [165, 360, 533, 720, 940, 1066];
  const url = new URL(imageUrl, window.location.origin);
  const baseUrl = url.origin + url.pathname;
  const versionParam = url.searchParams.get('v');

  const srcset =
    widths.map((w) => `${baseUrl}?v=${versionParam}&width=${w} ${w}w`).join(',') +
    `,${baseUrl}?v=${versionParam} 1600w`;

  return srcset;
}
