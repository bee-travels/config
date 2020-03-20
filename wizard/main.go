package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"text/template"

	"github.com/gorilla/mux"
)

func notFound(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Not Found anything of value")
}

func configHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Content Yaml")
}

func renderTemplate(w http.ResponseWriter, r *http.Request) {
	var data = map[string]map[string]string{}
	var ui = map[string]string{}
	ui["image"] = "bee-travels/ui"
	ui["tag"] = "v1.0.0"
	data["ui"] = ui
	dir, err := os.Getwd()
	if err != nil {
		log.Fatalln("could not get directory")
	}
	tmpl := template.Must(template.ParseFiles(dir + "/template/k8s.tmpl"))
	err = tmpl.Execute(w, data)
	if err != nil {
		log.Fatalln("could not render template")
	}
}

func main() {
	r := mux.NewRouter()

	r.HandleFunc("/api/v1/config", renderTemplate).Methods(http.MethodGet)

	r.PathPrefix("/").Handler(http.FileServer(http.Dir("client/build/"))).Methods(http.MethodGet)
	r.HandleFunc("/", notFound)

	port := ":8080"
	log.Printf("starting server at port : %s", port)
	log.Fatalln(http.ListenAndServe(port, r))
}
