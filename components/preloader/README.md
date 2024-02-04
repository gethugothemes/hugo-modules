# preloader components

## Install Module

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/components/preloader"
```

Add the following code to your `assets/scss/main.scss` or `assets/scss/style.scss` file.

```scss
@import 'preloader';
```

<hr>

## Preloader Implementation

Call it, as a partial in your theme.

```html
<!-- preloader -->
{{ partial "preloader.html" . }}
```

Define the preloader in the `config/_default/params.toml` file.

```toml
# Preloader
[preloader]
enable = true
preloader = "" # use jpg, png, svg or gif format.
```
