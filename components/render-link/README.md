# Render link components

## Install Module

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/components/render-link"
```

## Implementation

add custom classes to your link with `?class=` and add multiple classes with `+`.

```md
[Github](https://github.com/?class=github-btn+another-class)
```
