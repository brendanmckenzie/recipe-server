package main

import (
	"io/fs"
	"net/http"
	"os"

	"github.com/graphql-go/handler"
)

func main() {
	h := handler.New(&handler.Config{
		Schema:     &RecipeSchema,
		Pretty:     true,
		GraphiQL:   true,
		Playground: true,
	})

	http.Handle("/graphql", h)

	subfs, _ := fs.Sub(content, "cook-ui/build")
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// fallback to root
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

	})

	http.ListenAndServe(":8080", nil)
}
