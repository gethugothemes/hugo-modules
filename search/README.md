# Search

## Implementation

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/search"
```

Add the following code to your `asstes/scss/main.scss` or `asstes/scss/style.scss` file.

```scss
@import 'search';
```

Add the following code to your js plugins list in the `config.toml` file.

```html
[[params.plugins.js]]
link = "js/search.js"

```

<hr>

## How to use it

```html
{{ if site.Params.search.enable }}
<button type="button" data-target="search-modal">Search</button>
{{ end }}

{{ partial "search.html" . }}
```
