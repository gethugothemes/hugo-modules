# Button Shortcode

## Install Module

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/shortcodes/button"
```

> Note: Button style comes from your existing `button.scss` files. If you don't have this file, you can add the following css to your main css file.

  ```css
  .btn {
    display: inline-block;
    padding: 0.5em 1em;
    text-decoration: none;
    border: 1px solid transparent;
  }
  .btn-primary {
    background-color: #000;
    border-color: #000;
    color: #fff;
  }
  .btn-outline-primary {
    background-color: transparent;
    border-color: #000;
    color: #000;
  }
  ```

<hr>

## Shortcode Implementation

Available parameters:

* `label`: button label
* `link`: button link (internal or external)
* `style`: button style `outline`/`solid` (default: `solid`)
* `class`: custom class
* `rel`: link relationship (default: `noopener`)

```md
<!-- internal link -->
{{< button label="contact" link="contact/" >}}
<!-- external link -->
{{< button label="google" link="https://google.com/" rel="nofollow noreferrer" >}}
```
