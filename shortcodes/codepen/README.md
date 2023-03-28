# Codepen Shortcode

## Installation for Gethugothemes themes

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/shortcodes/codepen"
```

Add the following code to your js plugins list in the `config.toml` file.

```toml
[[params.plugins.js]]
link = "https://cpwebassets.codepen.io/assets/embed/ei.js"
attributes = "async"
```

<hr>

## Installation for other themes

Add the following script to your theme header.

```html
<script src="https://cpwebassets.codepen.io/assets/embed/ei.js" async></script>
```

<hr>

## Shortcode Implementation

```md
<!-- minimal use -->
{{< codepen QWvKwmq >}}

<!-- extended use -->
{{< codepen id="QWvKwmq" theme="light" height="600" >}}
```
