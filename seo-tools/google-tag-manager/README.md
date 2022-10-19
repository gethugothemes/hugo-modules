# Google tag manager

## GTM Module

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/seo-tools/google-tag-manager"
```

<hr>

## GTM Implementation

Call it, as a partial in your theme head.

```html
<!-- google tag manager -->
{{ partial "gtm.html" . }}
```

Call it, as a partial in your theme body.

```html
<!-- google tag manager noscript -->
{{ partial "gtm-noscript.html" . }}
```

Add this configuration to your `config/_default/params.toml` file.

```toml
# google tag manager, see https://developers.google.com/tag-manager/
google_tag_manager = "" # example: G-XXXXXXXXXX
```
