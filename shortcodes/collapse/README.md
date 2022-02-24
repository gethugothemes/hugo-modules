# Bootstrap Accordion/Collapse Shortcode

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/shortcodes/collapse"
```

## Shortcode Implementation

```md
{{< collapse "This is an accordion" >}}
- Lorem ipsum dolor sit amet consectetur adipisicing elit.
- Lorem ipsum dolor sit amet consectetur adipisicing elit.
- Lorem ipsum dolor sit amet consectetur adipisicing elit.
{{< /collapse >}}
```