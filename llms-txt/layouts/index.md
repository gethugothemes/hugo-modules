# {{ .Title | default site.Title }}
{{ with site.Params.metadata.description | default site.Params.description }}
> {{ . }}
{{- end }}

{{ if .RawContent }}{{ .RawContent }}{{ else }}{{ site.Params.description }}{{ end }}
