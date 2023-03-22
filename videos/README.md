# Video Modules

- Local or Remote video - [Read ↆ](https://github.com/gethugothemes/hugo-modules/tree/master/videos#localremote-video)
- Youtube Video [Read ↆ](https://github.com/gethugothemes/hugo-modules/tree/master/videos#youtube-video-lite-and-fast)
- Vimeo Video [Read ↆ](https://github.com/gethugothemes/hugo-modules/tree/master/videos#vimeo-video-lite-and-fast)

## Installation

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/videos"
```

<hr>

## Local/Remote Video

### Using Partial

```md
<!-- minimal use -->
{{ partial "video.html" (dict "Src" "https://www.w3schools.com/html/mov_bbb.mp4") }}

<!-- extended use -->
{{ partial "video.html" (dict "Src" "videos/demo.mp4" "Width" "500" "Height" "auto" "Autoplay" "false" "Loop" "false" "Muted" "false" "Controls" "true" "Class" "ght-video") }}
```

### Using Shortcode

```md
<!-- minimal use -->
{{< video src="https://www.w3schools.com/html/mov_bbb.mp4" >}}

<!-- extended use -->
{{< video src="videos/demo.mp4" width="500" height="auto" autoplay="false" loop="false" muted="false" controls="true" class="" >}}
```

**Available parameters/options:**

- `src`: video source
- `width`: video width
- `height`: video height
- `autoplay`: autoplay video | default: "false"
- `loop`: loop video after end | default: "false"
- `muted`: play video without sound | default: "false"
- `controls`: video controller | default: "true"
- `class`: video class

<hr>

## YouTube Video (Lite and Fast)

To add Youtube video as a Partial or Shortcode, add this plugin to your `config.toml` file.

```toml
[[params.plugins.js]]
link = "plugins/youtube-lite.js"
```

### Using Partial

```md
<!-- minimal use -->
{{ partial "youtube-lite.html" (dict "Id" "6FIoOJm3vYA") }}

<!-- extended use -->
{{ partial "youtube-lite.html" (dict "Id" "6FIoOJm3vYA" "Class" "mx-auto"  "Width" "600px" "Style" "" "Attr" "") }}
```

### Using Shortcode

```md
<!-- minimal use -->
{{< youtube-lite 6FIoOJm3vYA >}}

<!-- extended use -->
{{< youtube-lite id="6FIoOJm3vYA" class="mx-auto" width="600px" style="" attr="" >}}
```

**Available parameters/options:**

- `id`: YouTube video Id (ex: youtube.com/watch?v=`FeHiF0XQ8VQ`)
- `class`: video class
- `width`: video width
- `style`: add custom style
- `attr`: add custom attribute

<hr>

## Vimeo Video (Lite and Fast)

To add Vimeo video as a Partial or Shortcode, add this plugin to your `config.toml` file.

```toml
[[params.plugins.js]]
link = "plugins/vimeo-lite.js"
```

### Using Partial

```md
<!-- minimal use -->
{{ partial "vimeo-lite.html" (dict "Id" "805124764") }}

<!-- extended use -->
{{ partial "vimeo-lite.html" (dict "Id" "805124764" "Class" "mx-auto"  "Width" "600px" "Style" "" "Attr" "") }}
```

### Using Shortcode

```md
<!-- minimal use -->
{{< vimeo-lite 364402896 >}}

<!-- extended use -->
{{< vimeo-lite id="364402896" class="mx-auto" width="600px" style="" attr="" >}}
```

**Available parameters/options:**

- `id`: YouTube video Id (ex: vimeo.com/`805124764`)
- `class`: video class
- `width`: video width
- `style`: add custom style
- `attr`: add custom attribute
