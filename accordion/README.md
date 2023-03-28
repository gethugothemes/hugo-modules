# Accordion/Collapse

## Implementation

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/accordion"
```

Add the following code to your `asstes/scss/main.scss` or `asstes/scss/style.scss` file.

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
* `Content`: Accordion title
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
