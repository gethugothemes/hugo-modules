# Custom Script component

## Install Module

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/components/custom-script"
```

<hr>

## custom-script Implementation

Call it, as a partial in your theme head.

```html
<!-- custom script -->
{{ partialCached "custom-script.html" . }}
```

Configure it in the `config/_default/params.toml` file.

```toml
# custom script on header, example: custom_script= "<script>console.log(\"Hello World\")</script>"
custom_script = ""
```
