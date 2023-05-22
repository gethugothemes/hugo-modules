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

Add some following configuration to your `config/_default/config.toml` file.

```toml
############################# Outputs ##############################
[outputs]
home = ["SearchIndex"]

############################ Output Format ###########################
[outputFormats]
[outputFormats.SearchIndex]
mediaType = "application/json"
baseName = "searchindex"
isPlainText = true
notAlternative = true
```

<hr>

## Options
```toml
[search]
enable = true
primary_color = "#ce8460"
include_sections = ["post", "shop"] # if `include_sections` is empty, then section's will come from `mainSections`

show_image = true
show_description = true
show_tags = true
show_categories = true

input_placeholder = "Search Gethugothemes .." # i18n is `search_input_placeholder`
empty_results_placeholder = "Type something to search.." # i18n is `empty_search_results_placeholder`
```

## i18n
```yaml
- id: search_input_placeholder
  translation: Search Logbook ..

- id: no_results_for
  translation: No results for

- id: empty_search_results_placeholder
  translation: Type something to search..
```

<hr>

## How to use it

```html
{{ if site.Params.search.enable }}
<button type="button" data-target="search-modal">Search</button>
{{ end }}

{{ partial "search.html" (dict "Class" "custom-class-name") }}
or
{{ partial "search.html" }}
```
