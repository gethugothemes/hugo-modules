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
{{< button label="contact" link="contact/" >}}
<!-- external link -->
{{< button label="google" link="https://google.com/" >}}
```
