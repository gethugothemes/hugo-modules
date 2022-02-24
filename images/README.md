# Image components

## Install Module

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/images"
```

<hr>

## Logo Implementation

Call it, as a partial in your theme.

```html
<!-- logo -->
{{ partial "images/logo.html" . }}
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
{{ partialCached "images/favicon" . }}
```

Define the logo in the `config/_default/params.toml` file.

```toml
# favicon
favicon = "images/favicon.png"
```

<hr>


## Image Implementation

Call it, as a partial in your theme.

```html
{{ partial "images/image.html" (dict "Src" .Params.image "Size" "100x" "Alt" .Title) }}
```

<hr>


## Background-Image Implementation

Call it, as a partial in your theme.

```html
{{ partial `images/bg-image.html` (dict `Src` .background_image ) | safeHTMLAttr }}
```