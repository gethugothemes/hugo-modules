# Counter Analytics

## Counter analytics Module

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/seo-tools/counter-analytics"
```

<hr>

## Counter Implementation

Call it, as a partial in your theme head.

```html
<!-- counter -->
{{ partial "counter-analytics.html" . }}
```

Add some following configuration to your `config/_default/params.toml` file.

```toml
# counter analytics: see https://counter.dev/setup.html
[counter]
enable = false
username = ""  # your username
```
