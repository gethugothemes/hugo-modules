# Youtube Lite Shortcode (DEPRECATED)

use this new version instead <https://github.com/gethugothemes/hugo-modules/tree/master/videos>

## Installation for Gethugothemes themes

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/shortcodes/youtube-lite"
```

<hr>

## Shortcode Implementation

```md
<!-- minimal use -->
{{< youtube-lite 6FIoOJm3vYA >}}

<!-- extended use -->
{{< youtube-lite id="6FIoOJm3vYA" class="mx-auto" width="600px" style="" attr="" >}}
```
