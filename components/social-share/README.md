# Social share components

## Install Module

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/components/social-share"
```

Add the following code to your `asstes/scss/main.scss` or `asstes/scss/style.scss` file.

```scss
@import 'social-share';
```

<hr>

## Share Implementation

Call it, as a partial in your theme.

Available parameters:

* `Class`: wrapper class
* `Title`: share title
* `Facebook`: share facebook | default true
* `Twitter`: share twitter | default true
* `Email`: share Email | default true
* `Reddit`: share reddit | default true
* `Whatsapp`: share whatsapp | default true
* `Telegram`: share telegram | default true

```html
<!-- social share -->
{{ partial "social-share.html" (dict "class" "your-class") }}
```
