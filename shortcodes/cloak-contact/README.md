# Cloak Contact Shortcode

## Install Module

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/shortcodes/cloak-contact"
```

<hr>

## Shortcode Implementation

Available parameters:

* `address`: contact address
* `protocol`: contact protocol (default: `mailto` for email and `tel` for phone)
* `class`: custom class
* `query`: query string

```md
<!-- minimal use email -->
{{< cloakcontact "john.doe@mail.com" >}}

<!-- minimal use phone -->
{{< cloakcontact "+123345456" >}}

<!-- extended use -->
{{< cloakcontact address="john.doe@mail.com" protocol="mailto" query="subject=Test Subject" class="btn btn-primary" >}}
```
