# OpenRemark Comments

## Install Module

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/components/open-remark"
```

<hr>

## Comment Implementation

Call it, as a partial in your single page layout (e.g. `layouts/_default/single.html` or `layouts/posts/single.html`).

```html
<!-- open-remark comment -->
{{ partial "open-remark.html" . }}
```

Add the following configuration to your `config/_default/params.toml` file.

```toml
# OpenRemark Comments
[open_remark]
enable = true
site_key = ""                                # your site key from the OpenRemark dashboard
embed_url = "https://open-remark.zeon.studio/embed.js" # OpenRemark embed.js URL | Make sure it didn't change
```
