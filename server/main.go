package main

import (
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/valyala/fasthttp"
)

func main() {
	root := os.Getenv("FS_ROOT")
	if root == "" {
		root = "./public"
	}

	// Setup FS handler
	fs := &fasthttp.FS{
		Root:               root,
		IndexNames:         []string{"index.html"},
		GenerateIndexPages: true,
	}

	addr := "0.0.0.0:3000"

	// Start HTTP server.
	log.Printf("Starting HTTP server on %q\n", addr)
	go func() {
		if err := fasthttp.ListenAndServe(addr, fs.NewRequestHandler()); err != nil {
			log.Fatalf("error in ListenAndServe: %s", err)
		}
	}()

	log.Printf("Serving files from directory %s\n", root)

	sig := make(chan os.Signal, 1)
	signal.Notify(sig, syscall.SIGINT, syscall.SIGTERM)

	// Wait forever.
	<-sig
}
