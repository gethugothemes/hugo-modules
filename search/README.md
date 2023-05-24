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
search_page = true # true or false - **default is false**

show_image = true
show_description = true
show_tags = true
show_categories = true

input_placeholder = "Search Gethugothemes .." # i18n is `search_input_placeholder`
empty_results_placeholder = "Type something to search.." # i18n is `empty_search_results_placeholder`
```

## What is `search_page` in Options?
There are two search types. 
| 1. As a Popup      | 2. Within a Page |
| ----------- | ----------- |
| ![image](https://github.com/gethugothemes/hugo-modules/assets/87603786/daf67039-f84c-4799-95b8-4d647e0f535f)| ![image](https://github.com/gethugothemes/hugo-modules/assets/87603786/84ab4cc1-e8fd-460c-95f1-e5432b8b792b) |
   


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

## Use it

Add this code to where you want to place the search Button or Link
```html
{{ with site.Params.search }}
{{ if .enable }}
  {{ if .search_page }}
  <a href="{{`search` | relLangURL}}">Search Link</a>
  {{ else }}
  <button data-target="search-modal">Search Button</button>
  {{ end }}
{{ end }}
{{ end }}
```

and Add this partial to your `header.html` or inside your base template
```html
{{ partial "search.html" (dict "Context" . "Class" "custom-class-name") }}
```

### To use Search in a Page
`ex: http://demo.gethugothemes.com/logbook/site/search/?s=how`

Enable `search_page = true` in your search params

```toml
[search]
search_page = true
```
Create this two files

1. _**content/search.md**_
```yaml
---
title: "Search Results"
# description
description: "This is meta description"
layout: "search"
draft: false
---
```

2. _**layout/_default/search.html**_

if you do not want to customise the search result template then only define your main; that's it.
```html
{{ define "main" }}

{{ end }}
```
or customise the search result template
```html
{{ define "main" }}

<script id="search-result-item-template" type="text/x-js-template">
  <a data-result-item href="#{slug}">
    <div class="fs-0">
      #{image}
    </div>
    <div class="fg-1">
      <p class="search-title">#{title}</p>
      <p class="search-description">#{description}</p>
      <p class="search-content">#{content}</p>
      <div class="search-info">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" style="margin-top:-2px">
            <path d="M11 0H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2 2 2 0 0 0 2-2V4a2 2 0 0 0-2-2 2 2 0 0 0-2-2zm2 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1V3zM2 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V2z"/>
          </svg>
          #{categories}
        </div>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
            <path d="M3 2v4.586l7 7L14.586 9l-7-7H3zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2z"/>
            <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1v5.086z"/>
          </svg>
          #{tags}
        </div>
      </div>
    </div>
  </a>
</script>

{{ end }}
```

-----------------------------

NOTE : Use `Ctrl + K` or `Command + K` to Search, `ESC` to close, `ArrowUp` and `ArrowDown` key to navigate and `Enter` key to select.
