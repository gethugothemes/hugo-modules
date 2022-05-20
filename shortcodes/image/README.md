# Image Shortcode

## Install Module

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/shortcodes/image"
```

Add the following code to your `asstes/scss/style.scss` file.

```scss
@import 'image';
```

<hr>

## Shortcode Implementation

```md
<!-- minimal use -->
{{< image src="images/image.png"  >}}
<!-- exclusive use -->
{{< image src="images/image.png" caption="" alt="alter-text" height="" width="" position="center" command="fill" option="q100" class="img-fluid" title="image title"  webp="false" >}}
```
