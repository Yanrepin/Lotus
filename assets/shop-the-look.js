document.querySelectorAll('.shop-the-look-dot').forEach((dot) => {
  dot.addEventListener('click', (event) => {
    const index = event.target.dataset.productIndex;

    document.querySelectorAll('.shop-the-look-product-detail').forEach((detail) => {
      detail.hidden = detail.dataset.productIndex !== index;
    });
  });
});
