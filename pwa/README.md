# Progressive Web App

## PWA Module

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/pwa"
```

<hr>

## PWA Implementation

Call it, as a partial in your theme footer.

```html
<!-- logo -->
{{ partial "pwa.html" . }}
```