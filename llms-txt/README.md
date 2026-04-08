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
  home = ["HTML", "RSS", "llms", "llmsfull"]

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


---

## Configuration

Add an `[llms]` block to your `config/_default/params.toml`:

```toml
[llms]
  # Set to false to disable both llms.txt and llms-full.txt generation
  enable = true

  # Exclude pages from llms.txt by URL prefix.
  # Note: llms-full.txt always includes ALL pages regardless of this setting.
  # Examples:
  #   "/careers/"       → exclude all pages under /careers/
  #   "/blog/post-1/"   → exclude a specific page
  #   "/signin/"        → exclude the sign in page
  exclude = []
```

### Configuration reference

| Key | Type | Default | Description |
|---|---|---|---|
| `llms.enable` | bool | `true` | Enable/disable both output files |
| `llms.exclude` | list | `[]` | URL prefixes to exclude from `llms.txt` |

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