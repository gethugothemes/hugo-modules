# Tab

## Implementation

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/tab"
```

Add the following code to your `assets/scss/main.scss` or `assets/scss/style.scss` file.

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
<div class="tab" data-tab-group="tab-group-name">
  <ul class="tab-nav" data-tab-nav>
    <li class="tab-nav-item active" data-tab="0" tabindex="0">Tab 1</li>
    <li class="tab-nav-item" data-tab="1" tabindex="-1">Tab 2</li>
    <li class="tab-nav-item" data-tab="2" tabindex="-1">Tab 3</li>
  </ul>
  <div class="tab-content" data-tab-content>
    <div class="tab-content-panel active" data-tab-panel="0">
      Tab 1 content
    </div>
    <div class="tab-content-panel" data-tab-panel="1">
      Tab 2 content
    </div>
    <div class="tab-content-panel" data-tab-panel="2">
      Tab 3 content
    </div>
  </div>
</div>
```
