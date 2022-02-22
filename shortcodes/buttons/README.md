# Button Shortcode

## Install Module

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/shortcodes/buttons"
```

<hr>

## Shortcode Implementation

```md
<!-- internal link -->
{{< button "contact" "contact/" >}}
<!-- external link -->
{{< button "google" "https://google.com/" >}}
```