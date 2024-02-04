# Modal

## Implementation

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/modal"
```

Add the following code to your `assets/scss/main.scss` or `assets/scss/style.scss` file.

```scss
@import 'modal';
```

Add the following code to your js plugins list in the `config.toml` file.

```toml
[[params.plugins.js]]
link = "js/modal.js"

```

<hr>

## Use it as a Partial

Available parameters:

* `BtnLabel`: button label
* `BtnClass`: button class
* `Content`: modal content
* `BodyClass`: modal body item class

```html
{{ partial "modal" (dict "BtnLabel" "Click Me" "Content" "How are You?") }}
```

<hr>

## Use it as a Shortcode

Available parameters:

* `btn-label`: button label
* `btn-class`: modal button class
* `body-class`: modal content class

```md
{{< modal btn-label="Click Me" body-class="w-[1000px]" >}}

# How are You?

{{</ modal >}}
```

## Use it as raw Html

```html
<button class="btn btn-primary" data-modal-open>Click Me</button>

<div class="modal" data-modal>
  <div class="modal-overlay" data-modal-close data-modal-overlay></div>
  <div class="modal-content w-[1000px]">
    <h2>Hey There!</h2>
    <p>Have a good day.</p>
    <button class="modal-close" data-modal-close>&times;</button>
  </div>
</div>
```
