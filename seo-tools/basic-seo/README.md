# Basic SEO with Opengraph and Twitter Card

## Basic Seo Module

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/seo-tools/basic-seo"
```

<hr>

## Basic Seo Implementation

Call it, as a partial in your theme head.

```html
<!-- opengraph -->
{{ partial "basic-seo.html" . }}
```

Add some following configuration to your `config/_default/params.toml` file.

```toml
# seo meta data for OpenGraph / Twitter Card
[metadata]
keywords = ["Boilerplate", "Hugo", "Themefisher", "GetHugoThemes"]
description = "This is default meta description"
author = "GetHugoThemes"
image = "images/website-thumb.png" # this image will be used as fallback if a page has no image of its own
```
