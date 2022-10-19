# Google Adsense

## Install Module

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/adsense"
```

<hr>

## Implementation

Call it, as a partial in your `script.html` file.

```html
<!-- google adsense -->
{{ partialCached "adsense-script.html" . }}
```

If you want to use it in some specific location, then call this partial there.

```html
{{ partial "adsense" (dict "Slot" "YOUR_SLOT_ID" "Format" "auto") }}
```

If you want to use it in the markdown file, then call this shortcode in the markdown file.

```md
{{< adsense slot="YOUR_SLOT_ID" format="auto" >}}
```
