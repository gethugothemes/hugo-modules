# Plausible Analytics

## Plausible analytics Module

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/seo-tools/plausible-analytics"
```

<hr>

## Plausible Implementation

Call it, as a partial in your theme head.

```html
<!-- plausible -->
{{ partial "plausible-analytics.html" . }}
```

Add some following configuration to your `config/_default/params.toml` file.

```toml
# plausible analytics: see https://plausible.io/
[plausible]
enable = false
domain = ""    # yourdomain.com
```
