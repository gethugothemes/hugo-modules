# Youtube Lite Shortcode

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
{{< youtube-lite VufDd-QL1c0 >}}

<!-- extended use -->
{{< youtube-lite id="VufDd-QL1c0" class="mx-auto" style="width:500px" >}}
```