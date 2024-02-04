# Tab Shortcode (DEPRECATED)

use this new version instead <https://github.com/gethugothemes/hugo-modules/tree/master/tab>

## Installation for Gethugothemes themes

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/shortcodes/tabs"
```

Add the following code to your `assets/scss/main.scss` or `assets/scss/style.scss` file.

```scss
@import 'tabs';
```

<hr>

## Shortcode Implementation

```md
{{< tabs "demo-tab" >}}

{{< tab "first" >}}
First Tab
{{< /tab >}}

{{< tab "second" >}}
Second Tab
{{< /tab >}}

{{< tab "third" >}}
Third Tab
{{< /tab >}}

{{< /tabs >}}
```
