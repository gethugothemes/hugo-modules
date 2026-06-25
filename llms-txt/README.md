# llms-txt — Hugo Module

Automatically generates `/llms.txt` and `/llms-full.txt` for your Hugo site following the [llmstxt.org](https://llmstxt.org) specification. These files help AI assistants and LLMs understand and index your site's content.

- **`/llms.txt`** — a concise index of all pages, grouped by section, with optional exclusions
- **`/llms-full.txt`** — a complete full-content dump of every page for LLMs that can't follow links

---

## Requirements

- Hugo **0.147.2** or later (extended edition recommended)

---

## Installation

### Step 1 — Add the module to your `config/_default/module.toml`

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/llms-txt"
```

### Step 2 — Enable the output formats in your `hugo.toml`

The module auto-registers `llms`, `llmsfull`, and `md` output formats via its own `config.toml` — no need to define them manually. Just enable them for the relevant page kinds:

```toml
[outputs]
  home     = ["..rest", "HTML", "RSS", "llms", "llmsfull", "md"]
  page     = ["..rest", "HTML", "RSS", "md"]
  section  = ["..rest", "HTML", "RSS", "md"]
  taxonomy = ["..rest", "HTML", "RSS", "md"]
  term     = ["..rest", "HTML", "RSS", "md"]


```
Note: ...rest is a placeholder for any other output formats you may already have configured (e.g. "HTML", "RSS", etc.). Make sure to include those as well to avoid breaking existing functionality.

The `md` output format causes Hugo to generate an `index.md` file alongside each page's `index.html`. These are the files that `/llms.txt` links to, so AI assistants can fetch raw Markdown content directly.

## Configuration

Add an `[llms]` block to your `config/_default/params.toml`:

```toml
[llms]
  # Set to false to disable /llms.txt generation
  generate_llms_txt = true

  # Set to false to disable /llms-full.txt generation
  generate_llms_full_txt = true

  # Include only specific pages or directories.
  # If empty, all pages are included by default.
  # If populated, ONLY paths matching the list will be generated.
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
| `llms.generate_llms_txt` | bool | `true` | Enable/disable `/llms.txt` |
| `llms.generate_llms_full_txt` | bool | `true` | Enable/disable `/llms-full.txt` |
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
- [About](https://example.com/about/index.md): About page description
- [Pricing](https://example.com/pricing/index.md): Pricing page description

## Blog
- [Post Title](https://example.com/blog/my-post/index.md): Post summary...

## Docs
- [Getting Started](https://example.com/docs/getting-started/index.md): ...
```


### `llms-full.txt`

Contains the complete content of every page separated by 80-dash dividers:

```
# Site Title

> Site description

--------------------------------------------------------------------------------
title: "About Us"
url: https://example.com/about/index.md
description: Learn about our company
--------------------------------------------------------------------------------
[full page content]

--------------------------------------------------------------------------------
title: "My Blog Post"
url: https://example.com/blog/my-post/index.md
date: "2024-01-15"
description: Post description
--------------------------------------------------------------------------------
[full post content]
```


---
