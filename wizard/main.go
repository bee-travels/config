package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"text/template"

	"github.com/gorilla/mux"
)

type K8sServices struct {
	Deployment string `json:"deployment"`
	Version    string `json:"version"`
	UI         struct {
		Service string `json:"service"`
		Tag     string `json:"tag"`
	} `json:"ui"`
	Destination struct {
		Service string `json:"service"`
		Tag     string `json:"tag"`
	} `json:"destination"`
	Hotel struct {
		Service string `json:"service"`
		Tag     string `json:"tag"`
	} `json:"hotel"`
	Currencyexchange struct {
		Service string `json:"service"`
		Tag     string `json:"tag"`
	} `json:"currencyexchange"`
}

func notFound(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Not Found anything of value")
}

func configHandler(w http.ResponseWriter, r *http.Request) {
	b, _ := ioutil.ReadAll(r.Body)
	log.Println(string(b))
	fmt.Fprintln(w, "Content Yaml")
}

func renderTemplate(w http.ResponseWriter, r *http.Request) {
	// var data = map[string]map[string]string{}
	// var ui = map[string]string{}
	// var body map[string]interface{}
	var body K8sServices
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&body)
	if err != nil {
		log.Println("could not ready body")
	}
	// log.Printf("%v", body)

	dir, err := os.Getwd()
	if err != nil {
		log.Fatalln("could not get directory")
	}
	tmpl := template.Must(template.ParseFiles(dir + "/template/k8s.tmpl"))
	err = tmpl.Execute(w, body)
	if err != nil {
		log.Fatalln("could not render template")
	}
}

func main() {
	r := mux.NewRouter()

	r.HandleFunc("/api/v1/config", renderTemplate).Methods(http.MethodPost)

	r.PathPrefix("/").Handler(http.FileServer(http.Dir("client/build/"))).Methods(http.MethodGet)
	r.HandleFunc("/", notFound)

	port := ":8080"
	log.Printf("starting server at port : %s", port)
	log.Fatalln(http.ListenAndServe(port, r))
}
