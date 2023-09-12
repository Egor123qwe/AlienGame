package main

import (
	"Olymp/internal/server/serverApi"
	"log"
)

func main() {
	config := serverApi.NewConfig()
	if err := serverApi.Start(config); err != nil {
		log.Fatal(err)
	}
}
