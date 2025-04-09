# Social share components

## Install Module

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/components/social-share"
```

Add the following code to your `assets/css/main.css` file.

```css
@import 'social-share';
```

<hr>

## Share Implementation

Call it, as a partial in your theme.

Available parameters:

* `Context`: .
* `Class`: wrapper class
* `Title`: article title
* `Facebook`: share facebook | default `true`
* `X`: share x | default `true`
* `Email`: share email | default `true`
* `Reddit`: share reddit | default `true`
* `Whatsapp`: share whatsapp | default `true`
* `Telegram`: share telegram | default `true`
* `Linkedin`: share linkedin | default `true`
* `Pinterest`: share pinterest | default `true`
* `Tumblr`: share tumblr | default `true`
* `Vk`: share vk | default `true`
* `Fediverse`: share to any fediverse instance | default `true`
* `Copy`: copy link | default `true`

```html
<!-- social share -->
{{ partial "social-share.html" (dict "Context" .) }}
```
