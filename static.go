package main

import (
	"embed"
	"io/fs"
	"net/http"
	"os"
)

//go:embed cook-ui/build/*
var content embed.FS

type SpaHandler struct {
	Root fs.FS
}

func (h *SpaHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	fs := http.FileServer(http.FS(h.Root))

	f, err := subfs.Open(r.URL.Path[1:])
	if err != nil {
		if os.IsNotExist(err) {
			r.URL.Path = "/"
		}
	} else {
		f.Close()
	}

	// default serve
	fs.ServeHTTP(w, r)
}

var subfs, _ = fs.Sub(content, "cook-ui/build")

var staticHandler = &SpaHandler{
	Root: subfs,
}
