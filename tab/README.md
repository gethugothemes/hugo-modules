# Tab

## Implementation

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/tab"
```

Add the following code to your `asstes/scss/main.scss` or `asstes/scss/style.scss` file.

```scss
@import 'tab';
```

Add the following code to your js plugins list in the `config.toml` file.

```toml
[[params.plugins.js]]
link = "js/tab.js"

```

<hr>

## Use it as a Shortcode

```md
{{< tabs "tab-group-name" >}}

{{< tab "first" >}}
First Tab
{{< /tab >}}

{{< tab "second" >}}
Second Tab
{{< /tab >}}

{{< tab "third" >}}
Third Tab
{{< /tab >}}

{{< /tabs >}}
```

<hr>

## Use it in your HTML

```html
<div class="ghtm-tab" data-tab-group="tab-group-name">
  <ul class="ghtm-tab-nav">
    <li class="ghtm-tab-nav-item active" data-tab="0">Tab 1</li>
    <li class="ghtm-tab-nav-item" data-tab="1">Tab 2</li>
    <li class="ghtm-tab-nav-item" data-tab="2">Tab 3</li>
  </ul>
  <div class="ghtm-tab-content">
    <div class="ghtm-tab-content-panel active" data-tab="0">Tab 1 content</div>
    <div class="ghtm-tab-content-panel" data-tab="1">Tab 2 content</div>
    <div class="ghtm-tab-content-panel" data-tab="2">Tab 3 content</div>
  </div>
</div>
```
