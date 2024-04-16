# Announcement components

## Install Module

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/components/announcement"
```

Add the following code to your js plugins list in the `hugo.toml` or `config.toml` file.

```toml
[[params.plugins.js]]
link = "plugins/cookie.js"
```

<hr>

## Announcement Implementation

Call it, as a partial in your baseof.html file over the header partial.

```html
<!-- cookie consent -->
{{ partialCached "announcement.html" . }}
```

Call it, as a partial into bottom of `script.html` file.

```html
<!-- cookie consent -->
{{ partialCached "announcement-script.html" . }}
```

Configure it in the `config/_default/params.toml` file.

```toml
# announcement
[announcement]
enable = true
expire_days = 7
content = "This is a test announcement"
```
