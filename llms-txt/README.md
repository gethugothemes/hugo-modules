# llms-txt — Hugo Module

Automatically generates `/llms.txt` and `/llms-full.txt` for your Hugo site following the [llmstxt.org](https://llmstxt.org) specification. These files help AI assistants and LLMs understand and index your site's content.

- **`/llms.txt`** — a concise index of all pages, grouped by section, with optional exclusions
- **`/llms-full.txt`** — a complete full-content dump of every page for LLMs that can't follow links

---

## Installation

### Step 1 — Add the module to your `config/_default/module.toml`

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/llms-txt"
```

### Step 2 — Add the output formats to your `hugo.toml`

```toml

[outputs]
  home = ["...rest", "llms", "llmsfull"]
  # Add any other output formats your site already uses


[outputFormats.llms]
  baseName    = "llms"
  mediaType   = "text/plain"
  isPlainText = true
  notAlternative = true

[outputFormats.llmsfull]
  baseName    = "llms-full"
  mediaType   = "text/plain"
  isPlainText = true
  notAlternative = true


```
Note: ...rest is a placeholder for any other output formats you may already have configured (e.g. "HTML", "RSS", etc.). Make sure to include those as well to avoid breaking existing functionality.

## Configuration

Add an `[llms]` block to your `config/_default/params.toml`:

```toml
[llms]
  # Set to false to disable both llms.txt and llms-full.txt generation
  enable = true

  # Include only specific pages or directories.
  # If empty, all pages are included by default.
  # If populated, ONLY paths matching  list will be generated.
  # Both llms.txt and llms-full.txt respect this setting.
  # Examples:
  #   "/about/"      → include strictly the /about/ page
  #   "/blog/*"     → include immediate children of /blog/ (e.g. /blog/post-1/)
  #   "/blog/**"    → include /blog/ and all nested pages and directories
  include = []

  # Exclude specific pages or directories.
  # Follows the same wildcard formats as include.
  # Conflict handling: If the EXACT same path string is put in both include and exclude,
  # the include rule has higher priority (the exclude rule is ignored).
  # Both llms.txt and llms-full.txt respect this setting.
  # Examples:
  #   "/about/"       → exclude exactly /about/
  #   "/blog/**"     → exclude all pages under /blog/
  #   "/blog/post-1/"   → exclude a specific page
  exclude = []
```

### Configuration reference

| Key | Type | Default | Description |
|---|---|---|---|
| `llms.enable` | bool | `true` | Enable/disable both output files |
| `llms.include` | list | `[]` | URL patterns to include (overrides default all) |
| `llms.exclude` | list | `[]` | URL patterns to exclude (supports `*` and `**`) |

---

## How It Works

### `llms.txt`

Follows the [llmstxt.org](https://llmstxt.org) specification:

```
# Site Title

> Site description

## Pages
- [About](https://example.com/about/): About page description
- [Pricing](https://example.com/pricing/): Pricing page description

## Blog
- [Post Title](https://example.com/blog/my-post/): Post summary...

## Docs
- [Getting Started](https://example.com/docs/getting-started/): ...
```


### `llms-full.txt`

Contains the complete content of every page separated by 80-dash dividers:

```
# Site Title

> Site description

--------------------------------------------------------------------------------
title: "About Us"
url: https://example.com/about/
description: Learn about our company
--------------------------------------------------------------------------------
[full page content]

--------------------------------------------------------------------------------
title: "My Blog Post"
url: https://example.com/blog/my-post/
date: "2024-01-15"
description: Post description
--------------------------------------------------------------------------------
[full post content]
```


---
