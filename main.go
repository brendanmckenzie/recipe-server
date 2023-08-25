package main

import (
	"errors"
	"io/fs"
	"log"
	"net/http"
	"os"

	"github.com/graphql-go/handler"
)

func main() {

	http.Handle("/graphql", handler.New(&handler.Config{
		Schema:   &RecipeSchema,
		Pretty:   true,
		GraphiQL: true,
	}))

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

	log.Printf("starting server on port 8080\n")
	err := http.ListenAndServe(":8080", nil)
	if errors.Is(err, http.ErrServerClosed) {
		log.Printf("server closed\n")
	} else if err != nil {
		log.Printf("error starting server: %s\n", err)
		os.Exit(1)
	}

}
