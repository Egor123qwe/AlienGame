package serverApi

import (
	"Olymp/internal/routes"
	"Olymp/internal/server"
	"Olymp/internal/services/CORS"
	"Olymp/internal/storage/sqlStorage"
	"log"
	"net/http"
)

func Start(config *config) error {
	storage, err := sqlStorage.ConfigureStore(config.dbDriver, config.dbURL)
	if err != nil {
		log.Fatal(err)
	}
	s := server.NewServer(storage)
	routes.ConfigureRotes(s)

	return http.ListenAndServe("0.0.0.0"+config.serverPort, CORS.ConfigureCORS(s.Router))
}
