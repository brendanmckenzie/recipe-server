package main

import (
	"embed"
	"io/fs"
	"net/http"
	"os"
)

//go:embed cook-ui/build/*
var content embed.FS

type StaticHandler struct {
}

func (h *StaticHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	subfs, _ := fs.Sub(content, "cook-ui/build")
	fs := http.FileServer(http.FS(subfs))

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

var staticHandler = &StaticHandler{}
