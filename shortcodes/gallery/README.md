# Gallery and Slider Shortcode (DEPRECATED)

use this new version instead <https://github.com/gethugothemes/hugo-modules/tree/master/gallery-slider>

## Install Module

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/shortcodes/gallery"
```

Add the following code to your js plugins list in the `config.toml` file.

```toml
[[params.plugins.js]]
link = "plugins/glightbox.js"
```

Add the following code to your `assets/scss/main.scss` or `assets/scss/style.scss` file.

```scss
@import 'gallery';
```

<hr>

## Shortcode Implementation

### Gallery

```md
<!-- internal link -->
{{< gallery dir="images/gallery">}}
<!-- external link -->
{{< gallery dir="images/gallery" class="your-class" height="400" width="400" webp="false" command="Fit" option="" zoomable="true" >}}
```

### Slider

**Note:** You must need to add swiper slider to use this shortcode.

Add the following code to your js plugins list in the `config.toml` file.

```toml
[[params.plugins.js]]
link = "plugins/swiper-bundle.js"
```

Add the following code to your css plugins list in the `config.toml` file.

```toml
[[params.plugins.css]]
link = "plugins/swiper-bundle.css"
```

```md
<!-- internal link -->
{{< slider dir="images/gallery">}}
<!-- external link -->
{{< slider dir="images/gallery" class="your-class" height="400" width="400" webp="false" command="Fit" option="" zoomable="true" >}}
```

## Initialize slider into your script

```js
// gallery slider
new Swiper(".gallery-slider", {
  slidesPerView: 1,
  loop: true,
  autoHeight: true,
  spaceBetween: 0,
  speed: 1500,
  autoplay: {
    delay: 5000,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
```
