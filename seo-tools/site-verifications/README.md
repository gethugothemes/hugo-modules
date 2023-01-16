# Site verifications code setup

## Site verifications Module

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/seo-tools/site-verifications"
```

<hr>

## Site verifications Implementation

Call it, as a partial in your theme head.

```html
<!-- site verifications -->
{{ partial "site-verifications.html" . }}
```

Add some following configuration to your `config/_default/params.toml` file.

```toml
# site verifications
[site_verification]
google = ""   # Your verification code
bing = ""     # Your verification code
baidu = ""    # Your verification code
facebook = "" # Your verification code
mastodon = "" # Your verification code
```
