# New Shopify Theme Based on Dawn

## Work Plan

1. **Select Theme Design**
   - Find inspiration from modern and clean designs on Pinterest.
   - Choose a base design that aligns with Shopify’s best practices.
2. **Create a Figma Design**
   - Develop a structured and consistent design to ensure uniformity.
3. **Implement the Design**
   - Apply the design as the default layout for new theme installations.
4. **Develop New Features & Sections**
   - **RTL Support:** Full right-to-left layout compatibility.
   - **Infinite Scroll:** Implement infinite scrolling for search (SERP) and product listing pages (PLP), handling filtering and sorting.
   - **Shop The Look:** A section featuring an image with 1–4 products marked by interactive dots; clicking a dot displays a product card popup.
   - **WhatsApp Floating Icon:** Quick chat access for small businesses.
   - **Countdown Timer Section:** For sales, promotions, and limited-time offers.
   - **Recently Viewed Products:** Maintain consistency with Shopify’s built-in "Related Products" section.
   - **Product Badges:** Customizable sale badges with three options:
     - "SALE" label
     - Price difference display
     - Percentage discount
     - Additional badge customization based on product tags.
   - **Additional Features:** Research other Shopify themes for inspiration and best practices.
5. **Ensure Compliance with Shopify Requirements**
   - Follow Shopify’s official theme requirements: [Shopify Theme Requirements](https://shopify.dev/docs/storefronts/themes/store/requirements).
6. **Implement on Demo Site**
   - Create Demo site.
   - Implement The Theme with real products and Site content.
   - Take Screenshots to present on Shopify Theme Store.



## Development

### Local Development
```sh
shopify theme dev
```
### Publish
```sh
shopify theme publish
```



## Already Supported:
### Sections:
- Infinite scroll for collections (enabled via a toggle in the product grid component).
- Shop The Look.
- CountDown timer.
- Steps

### Settings:
- WhatsApp integration.
- Swatches at product grid (PLP,SERP,Widget) , options for color\variant images
- RTL support (toggle available in layout settings).
  - For specific elements, use:
  ```sh
  {% if settings.right_to_left %}active-rtl{% endif %}  
  ```
  - Adjust CSS accordingly to maintain consistency.
