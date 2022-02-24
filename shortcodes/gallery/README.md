# Gallery Shortcode

## Install Module

Add the following code to your js plugins list in the `config.toml` file.

```toml
[[params.plugins.js]]
link = "plugins/gallery/glightbox.js"
```

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/shortcodes/gallery"
```

Add the following code to your `asstes/scss/style.scss` file.

```scss
@import 'gallery';
```

<hr>

## Shortcode Implementation

```md
<!-- internal link -->
{{< gallery dir="images/gallery">}}
<!-- external link -->
{{< gallery dir="images/gallery" class="your-class" height="400" width="400" webp="false" command="Fit" option="" zoomable="true" >}}
```