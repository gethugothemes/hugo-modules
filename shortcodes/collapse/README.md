# Bootstrap Accordion/Collapse Shortcode (DEPRICATED)

use this new version instead <https://github.com/gethugothemes/hugo-modules/tree/master/accordion>

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/shortcodes/collapse"
```

Add the following code to your `asstes/scss/main.scss` or `asstes/scss/style.scss` file.

```scss
@import 'collapse';
```

## Shortcode Implementation

```md
{{< collapse "This is an accordion" >}}
- Lorem ipsum dolor sit amet consectetur adipisicing elit.
- Lorem ipsum dolor sit amet consectetur adipisicing elit.
- Lorem ipsum dolor sit amet consectetur adipisicing elit.
{{< /collapse >}}
```
