package main

import (
	"fmt"
	"github.com/codegangsta/negroni"
	"github.com/gorilla/mux"
	"net/http"
)

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hi!")
}

func main() {

	r := mux.NewRouter()
	r.HandleFunc("/", HomeHandler)

	n := negroni.Classic()
	n.UseHandler(r)

	n.Run(":8000")

}
