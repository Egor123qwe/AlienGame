package models

type Game struct {
	Id     int    `json:"id"`
	Code   string `json:"code"`
	Status bool   `json:"status"`
}
