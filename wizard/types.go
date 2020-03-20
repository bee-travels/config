package main

type Config struct {
	Deployment       string           `json:"deployment"`
	Version          string           `json:"version"`
	UI               UI               `json:"ui"`
	Destination      Destination      `json:"destination"`
	Hotel            Hotel            `json:"hotel"`
	Currencyexchange Currencyexchange `json:"currencyexchange"`
	Cart             Cart             `json:"cart"`
	Payment          Payment          `json:"payment"`
	Checkout         Checkout         `json:"checkout"`
	Email            Email            `json:"email"`
	Carrental        Carrental        `json:"carrental"`
	Flight           Flight           `json:"flight"`
	Weather          Weather          `json:"weather"`
	Message          Message          `json:"message"`
}
type UI struct {
	Service string `json:"service"`
	Tag     string `json:"tag"`
}
type Destination struct {
	Service string `json:"service"`
	Tag     string `json:"tag"`
}
type Hotel struct {
	Service string `json:"service"`
	Tag     string `json:"tag"`
}
type Currencyexchange struct {
	Service string `json:"service"`
	Tag     string `json:"tag"`
}
type Cart struct {
	Service string `json:"service"`
	Tag     string `json:"tag"`
}
type Payment struct {
	Service string `json:"service"`
	Tag     string `json:"tag"`
}
type Checkout struct {
	Service string `json:"service"`
	Tag     string `json:"tag"`
}
type Email struct {
	Service string `json:"service"`
	Tag     string `json:"tag"`
}
type Carrental struct {
	Service string `json:"service"`
	Tag     string `json:"tag"`
}
type Flight struct {
	Service string `json:"service"`
	Tag     string `json:"tag"`
}
type Weather struct {
	Service string `json:"service"`
	Tag     string `json:"tag"`
}
type Message struct {
	Service string `json:"service"`
	Tag     string `json:"tag"`
}