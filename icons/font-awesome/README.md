# Font Awesome Icons

## Install Module

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/icons/font-awesome"
```

Add the following code to your CSS plugins list in the `config.toml` file.

```toml
# for brands
[[params.plugins.css]]
link = "plugins/font-awesome/v6/brands.css"
# load all icons except brands
[[params.plugins.css]]
link = "plugins/font-awesome/v6/icons.css"
# regular icons font family
[[params.plugins.css]]
link = "plugins/font-awesome/v6/regular.css"
# solid icons font family
[[params.plugins.css]]
link = "plugins/font-awesome/v6/solid.css"
```

_**you can use v5 for font-awesome 5**_

<hr>

## Icon Implementation

```html
<i class="fa-solid fa-search"></i>
```
