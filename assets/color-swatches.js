function handleSwatchClick(event) {
  const swatch = event.currentTarget;
  const swatchWrapper = swatch.closest('.colorsWrapper');
  const cardElement = swatch.closest('.card-wrapper');

  //handling data
  const color = swatch.dataset.color;
  const product = JSON.parse(swatchWrapper.dataset.product);
  const allProductImages = product.images || [];
  const option = swatch.dataset.option;

  const relatedVariations = product?.variants.filter((variation) => {
    if (variation.option1 == color || variation.option2 == color || variation.option3 == color) return true;
    return false;
  });

  handleImages(swatch, relatedVariations, cardElement, allProductImages);

  //handle selected calss
  swatchWrapper.querySelectorAll('.selected').forEach((selected) => {
    selected.classList.remove('selected');
  });
  swatch.classList.add('selected');
}

// event for + sign to open or close the overflow swatches
function handleMoreSwatchesClick(event) {
  const plusOrMinus = event.target;
  const swatchesWrapperElement = plusOrMinus.closest('.colorsWrapper');
  if (swatchesWrapperElement) {
    if (plusOrMinus.innerHTML.indexOf('+') > -1) {
      plusOrMinus.innerHTML = plusOrMinus.innerHTML.replace('+', '-');
      swatchesWrapperElement.querySelectorAll('.overMaxSwatchHidden').forEach((overflowSwatch) => {
        overflowSwatch.classList.add('overMaxSwatchVisible');
        overflowSwatch.classList.remove('overMaxSwatchHidden');
      });
    } else {
      plusOrMinus.innerHTML = plusOrMinus.innerHTML.replace('-', '+');
      swatchesWrapperElement.querySelectorAll('.overMaxSwatchVisible').forEach((overflowSwatch) => {
        overflowSwatch.classList.add('overMaxSwatchHidden');
        overflowSwatch.classList.remove('overMaxSwatchVisible');
      });
    }
  }
}

function handleImages(swatch, relatedVariations, cardElement, allProductImages) {
  //find variant images if exists and handle main image
  const imageElements = cardElement.querySelectorAll('.media img');
  var image = swatch.dataset.variantFirstImage;
  var second = swatch.dataset.variantSecondImage;
  //enter if need find firstImage or there are hover effact and need the second
  if (relatedVariations && (!image || (!second && imageElements.length > 1))) {
    const variationWithImage = relatedVariations.filter((variation) => {
      if (variation.featured_image && variation.featured_image.src) return true;
      return false;
    });
    if (variationWithImage.length > 0) {
      image = variationWithImage[0].featured_image.src;
      second = variationWithImage[0].featured_image.src;
    }
    if (variationWithImage.length > 1) {
      second = variationWithImage[1].featured_image.src;
    }
  }
  //set defualt product images if variant images not found
  if (!image && allProductImages.length > 0) {
    image = allProductImages[0];
  }
  if (!second && allProductImages.length > 1) {
    second = allProductImages[1];
  }

  //change first image
  if (image && imageElements.length > 0) {
    imageElements[0].setAttribute('src', image);
    imageElements[0].srcset = buildSrcset(image);
  }
  //change second image if using second image affect
  if (second && imageElements.length > 1) {
    imageElements[1].setAttribute('src', second);
    imageElements[1].srcset = buildSrcset(second);
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
