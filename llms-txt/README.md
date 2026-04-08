# llms-txt — Hugo Module

Automatically generates `/llms.txt` and `/llms-full.txt` for your Hugo site following the [llmstxt.org](https://llmstxt.org) specification. These files help AI assistants and LLMs understand and index your site's content.

- **`/llms.txt`** — a concise index of all pages, grouped by section, with optional include/exclude filtering
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
  home = [ "...rest",  "llms", "llmsfull"]

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
Note: If you already have a custom `outputs` configuration, just add `llms` and `llmsfull` to the list for `home`.


---

## Configuration

Add an `[llms]` block to your `config/_default/params.toml`:

```toml
[llms]
  # Set to false to disable both llms.txt and llms-full.txt generation
  enable = true

  # Include only these pages in llms.txt. Supports glob patterns.
  # When non-empty, pages NOT matched are hidden — unless also matched by include.
  # include always wins over exclude.
  # Examples:
  #   "/blog/**"        → all pages under /blog/ (recursive)
  #   "/blog/*"         → direct children of /blog/ only
  #   "/blog/post-1/"   → one specific page
  include = []

  # Exclude pages from llms.txt. Supports glob patterns.
  # Has no effect on a page that is also matched by include.
  # Note: llms-full.txt always includes ALL pages regardless of this setting.
  # Examples:
  #   "/careers/**"     → all pages under /careers/
  #   "/blog/draft/"    → one specific page
  exclude = []
```

### Configuration reference

| Key | Type | Default | Description |
|---|---|---|---|
| `llms.enable` | bool | `true` | Enable/disable both output files |
| `llms.include` | list | `[]` | Glob patterns — only matched pages appear in `llms.txt`. Empty means all pages included. `include` always wins over `exclude`. |
| `llms.exclude` | list | `[]` | Glob patterns — matched pages are hidden from `llms.txt`. Ignored for pages also matched by `include`. |

### Glob pattern syntax

| Pattern | Matches |
|---|---|
| `/about/` | Exactly `/about/` |
| `/blog/*` | Direct children of `/blog/` only |
| `/blog/**` | `/blog/` itself and every page beneath it |
| `/blog/post-1/` | One specific page |

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