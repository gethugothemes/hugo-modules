# Mermaid Shortcode

## Installation

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/shortcodes/mermaid"
```

<hr/>

## Acknowledgments

This shortcode is built using [mermaid-js](https://mermaid.js.org/).


## Shortcode Implementation

```md
{{< mermaid >}}
sequenceDiagram
	Site->>mermaid: initialize
	Site->>mermaid: content loaded
	mermaid->>mermaidAPI: init

{{< /mermaid >}}
```

Alternatively, you can use standard Markdown fenced code blocks:

```md
```mermaid
sequenceDiagram
	Site->>mermaid: initialize
	Site->>mermaid: content loaded
	mermaid->>mermaidAPI: init
    ```
```


Configuration options can be passed in the front matter of the shortcode using the `---` delimiter. For example:
for more advanced configuration, you can read the [mermaid-js documentation](https://mermaid.js.org/config/theming.html).

```md
{{< mermaid >}}
---
title: Hello Title
config:
  theme: neutral
---
sequenceDiagram
	Site->>mermaid: initialize
	Site->>mermaid: content loaded
	mermaid->>mermaidAPI: init
{{< /mermaid >}}
```

---
