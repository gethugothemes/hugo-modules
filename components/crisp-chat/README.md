# Crisp Chat components

## Install Module

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/components/crisp-chat"
```

<hr>

## crisp-chat Implementation

Call it, as a partial in your theme head.

```html
<!-- crisp-chat -->
{{ partial "crisp-chat.html" . }}
```

Configure it in the `config/_default/params.toml` file.

```toml
# Crisp Chat
[crisp_chat]
enable = false
crisp_website_id = "9aa449e1-9999-422a-938f-8567982eec6d" # replace this code with yours
# Check this video tutorial to get your crisp website ID - https://www.youtube.com/watch?v=nW5UX6iVdFc
```
