# Progressive Web App

## PWA Module

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/pwa"
```

<hr>

## PWA Implementation

Call it, as a partial in your theme head.

```html
<!-- progressive web app -->
{{ partial "manifest.html" . }}
```

Call it, as a partial in your theme footer.

```html
<!-- progressive web app -->
{{ partial "pwa.html" . }}
```

Add some following configuration to your `config/_default/config.toml` file.

```toml
############################# Outputs ##############################
[outputs]
home = ["WebAppManifest"]

############################ Media types ############################
[mediaTypes]
[mediaTypes."application/manifest+json"]
suffixes = ["webmanifest"]

############################ Output Format ###########################
[outputFormats]
[outputFormats.WebAppManifest]
mediaType = "application/manifest+json"
rel = "manifest"
```
