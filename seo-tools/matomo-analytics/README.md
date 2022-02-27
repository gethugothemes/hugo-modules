# Matomo Analytics

## Matomo analytics Module

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/seo-tools/matomo-analytics"
```

<hr>

## Matomo Implementation

Call it, as a partial in your theme head.

```html
<!-- matomo -->
{{ partial "matomo-analytics.html" . }}
```

Add some following configuration to your `config/_default/params.toml` file.

```toml
# matomo tracking: see https://matomo.org/
[matomo]
enable = false
url = ""       # your matomo url
id = ""        # your matomo id
```
