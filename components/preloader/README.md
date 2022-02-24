# preloader components

## Install Module

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/components/preloader"
```

Add the following code to your `asstes/scss/style.scss` file.

```scss
@import 'preloader';
```


<hr>

## Preloader Implementation

Call it, as a partial in your theme.

```html
<!-- logo -->
{{ partial "preloader.html" . }}
```

Define the logo in the `config/_default/params.toml` file.

```toml
# Preloader
[preloader]
enable = true
preloader = "" # use jpg, png, svg or gif format.
```
