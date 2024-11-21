# Notice Shortcode
      },

## Installation for Gethugothemes themes

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/shortcodes/notice"
```

Add the following code to your `assets/scss/main.scss` or `assets/scss/style.scss` file.

```scss
@import 'notice';
```

<hr>

## Acknowledgments

The notice types are heavily inspired by [Obsidian's Callouts](https://help.obsidian.md/Editing+and+formatting/Callouts).

The svg icons are from [heroicons.com](https://heroicons.com/)

## Shortcode Implementation


```md
{{< notice "abstract" >}}
{{< /notice >}}
```
Aliases: `summary`, `tldr`

---

```md
{{< notice "info" >}}
{{< /notice >}}
```

---

```md
{{< notice "todo" >}}
{{< /notice >}}
```
---
```md
{{< notice "tip" >}}
{{< /notice >}}
```
Aliases: `hint`, `important`

---

```md
{{< notice "success" >}}
{{< /notice >}}
```
Aliases: `check`, `done`

---

```md
{{< notice "question" >}}
{{< /notice >}}
```
Aliases: `help`, `faq`

---

```md
{{< notice "warning" >}}
{{< /notice >}}
```
Aliases: `caution`, `attention`

---

```md
{{< notice "failure" >}}
{{< /notice >}}
```
Aliases: `fail`, `missing`

---

```md
{{< notice "danger" >}}
{{< /notice >}}
```
Aliases: `error`

---

```md
{{< notice "bug" >}}
{{< /notice >}}
```

---

```md
{{< notice "example" >}}
{{< /notice >}}
```

---

```md
{{< notice "quote" >}}
{{< /notice >}}
```
Aliases: `cite`
