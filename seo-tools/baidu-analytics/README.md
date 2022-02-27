# Baidu Analytics

## Baidu analytics Module

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/seo-tools/baidu-analytics"
```

<hr>

## Baidu Implementation

Call it, as a partial in your theme head.

```html
<!-- baidu -->
{{ partial "baidu-analytics.html" . }}
```

Add some following configuration to your `config/_default/params.toml` file.

```toml
# baidu analytics: see https://tongji.baidu.com/
[baidu]
enable = false
analytics_id = "" # Your ID
```
