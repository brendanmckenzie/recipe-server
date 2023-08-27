package main

import (
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
)

func main() {
	http.Handle("/graphql", handleApi)
	http.Handle("/", staticHandler)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	host := fmt.Sprintf(":%s", port)
	log.Printf("starting server on port %v\n", host)
	err := http.ListenAndServe(host, nil)
	if errors.Is(err, http.ErrServerClosed) {
		log.Printf("server closed\n")
	} else if err != nil {
		log.Printf("error starting server: %s\n", err)
		os.Exit(1)
	}

}
