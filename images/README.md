# Image components

## Install Module

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/images"
```

Add the following code to your `asstes/scss/main.scss` or `asstes/scss/style.scss` file.

```scss
@import 'images';
```

If you want to enable placeholder/lazy-loader, then add the following code to your js plugins list in the `config.toml` file.

```toml
[[params.plugins.js]]
link = "plugins/lazy-loader.js"
```

<hr>

## Logo Implementation

Call it, as a partial in your theme.

```html
<!-- logo -->
{{ partial "logo.html" }}
```

Define the logo in the `config/_default/params.toml` file.

```toml
# logo
logo = "images/favicon.png"
# logo_dark only used when theme has a dark mode
logo_dark = "images/favicon.png"

# use `px` or `x` with logo_width, example: "100px".
# Note: logo_width is not work with .svg file
logo_width = "100px"

# if logo_webp set false, it will not generate WEBP version of logo
logo_webp = true # default is true

# logo text will only show when logo is missing.
logo_text = "Boilerplate"
```

<hr>

## Favicon Implementation

Call it, as a partial in your theme.

```html
<!-- favicon -->
{{ partialCached "favicon" . }}
```

Define the logo in the `config/_default/params.toml` file.

```toml
# favicon
favicon = "images/favicon.png"
```

<hr>

## Image Implementation

Call it, as a partial in your theme.

Available parameters:

* `Src`: image source
* `Alt`: image alt text
* `Size`: image size (example: "100x100")
* `Class`: image class
* `Resize`: image resizer | default: true
* `Webp`: generate webp version | default: true
* `Context`: image context | default: .
* `Command`: image resizing command | default: "Resize"
* `Placeholder`: image placeholder | default: false

```html
<!-- simple image call -->
{{ partial "image.html" (dict "Src" .Params.image ) }}

<!-- for content folder image, use .Context -->
{{ partial "image.html" (dict "Src" .Params.image "Context" .Page ) }}
```

<hr>

## Background-Image Implementation

Call it, as a partial in your theme.

Available parameters:

* `Src`: background-image source
* `Size`: background-image resize (example: "100x100")
* `Perspective`: background-size | default: "cover"
* `Webp`: generate webp version | default: true
* `Context`: image context | default: .
* `Position`: background-position | default: "center center"
* `Repeat`: background-repeat | default: "no-repeat"
* `Placeholder`: If `Placeholder` is true, then `lazy` class is required to this element. | default: false

```html
{{ partial `bg-image.html` (dict `Src` .background_image ) | safeHTMLAttr }}
```

<hr>

## Shortcode Implementation

```md
<!-- minimal use -->
{{< image src="images/image.png"  >}}
<!-- exclusive use -->
{{< image src="images/image.png" caption="" alt="alter-text" height="" width="" position="center" command="fill" option="q100" class="img-fluid" title="image title"  webp="false" >}}
```
