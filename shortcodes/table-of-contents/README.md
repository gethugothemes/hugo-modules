# Table Of Contents Shortcode (DEPRECATED)

use this new version instead <https://github.com/gethugothemes/hugo-modules/tree/master/table-of-contents>

## Install Module

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/shortcodes/table-of-contents"
```

Add the following code to your `assets/scss/main.scss` or `assets/scss/style.scss` file.

```scss
@import 'toc';
```

<hr>

## Shortcode Implementation

```md
{{< toc >}}
```

<hr>

## Customize Shortcode

```toml
[markup.tableOfContents]
startLevel = 2
endLevel = 5
ordered = true
```
