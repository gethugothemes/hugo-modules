# Gallery and Slider Shortcode

## Install Module

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/gallery-slider"
```

Add the following code to your css plugins list in the `config.toml` file.

```toml
[[params.plugins.css]]
link = "plugins/glightbox/glightbox.css"
```

Add the following code to your js plugins list in the `config.toml` file.

```toml
[[params.plugins.js]]
link = "plugins/glightbox/glightbox.js"

[[params.plugins.js]]
link = "js/gallery-slider.js"
```

Add the following code to your `assets/scss/main.scss` or `assets/scss/style.scss` file.

```scss
@import 'gallery-slider';
```

<hr>

## Use it as a Partial

### Gallery

Available parameters:

* `Dir`: gallery directory
* `Class`: gallery custom class
* `Height`: gallery image processing height
* `Width`: gallery image processing width
* `Webp`: generate webp version | default: true
* `Resize`: image resizer | default: true
* `Command`: image resizing command | default: "Fit"
* `Option`: image processing custom options
* `Zoomable`: image zoomable option | default: true

```html
{{ partial "gallery.html" (dict "Dir" "images/gallery") }}
```

### Slider

**Note:** You must need to add swiper slider to use this shortcode.

Add the following code to your js plugins list in the `config.toml` file.

```toml
[[params.plugins.js]]
link = "plugins/swiper/swiper-bundle.js"
```

Add the following code to your css plugins list in the `config.toml` file.

```toml
[[params.plugins.css]]
link = "plugins/swiper/swiper-bundle.css"
```

Available parameters:

* `Dir`: gallery directory
* `Srcs`: slice of image URLs (alternative to `Dir`)
* `Class`: gallery custom class
* `Height`: gallery image processing height
* `Width`: gallery image processing width
* `Webp`: generate webp version | default: true
* `Resize`: image resizer | default: true
* `Command`: image resizing command | default: "Fit"
* `Option`: image processing custom options
* `Zoomable`: image zoomable option | default: true

```html
{{ partial "slider.html" (dict "Dir" "images/gallery") }}
```

<hr>

## Use it as a Shortcode

### Gallery

Available parameters:

* `dir`: gallery directory
* `class`: gallery custom class
* `height`: gallery image processing height
* `width`: gallery image processing width
* `webp`: generate webp version | default: true
* `resize`: image resizer | default: true
* `command`: image resizing command | default: "Fit"
* `option`: image processing custom options
* `zoomable`: image zoomable option | default: true

```md
{{< gallery dir="images/gallery">}}
```

### Slider

**Note:** You must need to add swiper slider to use this shortcode.

Add the following code to your js plugins list in the `config.toml` file.

```toml
[[params.plugins.js]]
link = "plugins/swiper/swiper-bundle.js"
```

Add the following code to your css plugins list in the `config.toml` file.

```toml
[[params.plugins.css]]
link = "plugins/swiper/swiper-bundle.css"
```

Available parameters:

* `dir`: gallery directory
* `class`: gallery custom class
* `height`: gallery image processing height
* `width`: gallery image processing width
* `webp`: generate webp version | default: true
* `resize`: image resizer | default: true
* `command`: image resizing command | default: "Fit"
* `option`: image processing custom options
* `zoomable`: image zoomable option | default: true

```md
{{< slider dir="images/gallery">}}
```
