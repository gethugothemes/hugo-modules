# Buttons Shortcode (DEPRECATED)

use this new version instead <https://github.com/gethugothemes/hugo-modules/tree/master/shortcodes/button>

## Install Module

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/shortcodes/buttons"
```

<hr>

## Shortcode Implementation

Available parameters:

* `label`: button label
* `link`: button link (internal or external)
* `style`: button style `outline`/`solid` (default: `solid`)
* `class`: custom class

```md
<!-- internal link -->
{{< button label="contact" link="contact/" >}}
<!-- external link -->
{{< button label="google" link="https://google.com/" >}}
```
