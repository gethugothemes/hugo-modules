# Accordion/Collapse

## Implementation

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/accordion"
```

Add the following code to your `assets/scss/main.scss` or `assets/scss/style.scss` file.

```scss
@import 'accordion';
```

Add the following code to your js plugins list in the `config.toml` file.

```toml
[[params.plugins.js]]
link = "js/accordion.js"

```

<hr>

## Use it as a Partial

Available parameters:

* `Title`: Accordion title
* `Content`: Accordion content
* `Class`: Accordion item class
* `HeaderClass`: Accordion header item class
* `BodyClass`: Accordion body item class

```html
{{ partial "accordion" (dict "Title" "Hello" "Content" "How are You") }}
```

<hr>

## Use it as a Shortcode

Available parameters:

* `title`: Accordion title
* `class`: Accordion item class
* `header-class`: Accordion header item class
* `body-class`: Accordion body item class

```md
{{< accordion title="This is an accordion" >}}
- Lorem ipsum dolor sit amet consectetur adipisicing elit.
- Lorem ipsum dolor sit amet consectetur adipisicing elit.
- Lorem ipsum dolor sit amet consectetur adipisicing elit.
{{< /accordion >}}
```

## Use it as raw Html

```html
<div class="accordion">
  <button class="accordion-header" data-accordion>
    Accordion Title
    <svg class="accordion-icon" x="0px" y="0px" viewBox="0 0 512 512" xmlspace="preserve">
      <path fill="currentColor" d="M505.755,123.592c-8.341-8.341-21.824-8.341-30.165,0L256.005,343.176L36.421,123.592c-8.341-8.341-21.824-8.341-30.165,0 s-8.341,21.824,0,30.165l234.667,234.667c4.16,4.16,9.621,6.251,15.083,6.251c5.462,0,10.923-2.091,15.083-6.251l234.667-234.667 C514.096,145.416,514.096,131.933,505.755,123.592z"></path>
    </svg>
  </button>
  <div class="accordion-content">
    <p>Accordion Content...</p>
  </div>
</div>
```
