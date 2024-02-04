# Notice Shortcode

## Installation for Gethugothemes themes

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/shortcodes/notice"
```

Add the following code to your `assets/scss/main.scss` or `assets/scss/style.scss` file.

```scss
@import 'notice';
```

<hr>

## Shortcode Implementation

```md
{{< notice "note" >}}
  This is a simple note.
{{< /notice >}}

{{< notice "tip" >}}
  This is a simple tip.
{{< /notice >}}

{{< notice "info" >}}
  This is a simple info.
{{< /notice >}}

{{< notice "warning" >}}
  This is a simple warning.
{{< /notice >}}
```
