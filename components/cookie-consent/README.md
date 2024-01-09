# Cookie Consent (GDPR) components

## Install Module

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/components/cookie-consent"
```

Add the following code to your js plugins list in the `hugo.toml` or `config.toml` file.

```toml
[[params.plugins.js]]
link = "plugins/cookie.js"
```

<hr>

## cookie-consent Implementation

Call it, as a partial in your theme. [NOTE: add it into bottom of `script.html` file]

```html
<!-- cookie consent -->
{{ partialCached "cookie-consent.html" . }}
```

Configure it in the `config/_default/params.toml` file.

```toml
# cookies
[cookies]
enable = true
expire_days = 2
content = "This site uses cookies. By continuing to use this website, you agree to their use."
button = "I Accept"
```
