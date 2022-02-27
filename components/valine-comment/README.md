# Valine comments

## Install Module

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/components/valine-comment"
```

<hr>

## Comment Implementation

Call it, as a partial in your theme.

```html
<!-- valine comment -->
{{ partial "valine-comment.html" . }}
```

Add some following configuration to your `config/_default/params.toml` file.

```toml

# Valine Comment
[valine_comment]
enable = true
appId = ""    # replace this code with yours [ex: QGzwQXOqs5JOhN4RGPOkR2mR-MdYXbMMI]
appKey = ""   # replace this code with yours [ex: WBmoGyJtbqUswvfLh6L8iEBr]
# language = "change language translation from `i18n`"
avatar = ""      # see : https://valine.js.org/en/avatar.html
pageSize = 10    # will show 10 comments per page
visitor = true
highlight = true # Code highlighting
recordIP = true  # Record reviewer IP.
enableQQ = false # https://valine.js.org/en/configuration.html#enableQQ
# serverURLs = "" # https://leancloud.your_website.com
# Check Valine's official documentation here - https://valine.js.org/en/configuration.html
```