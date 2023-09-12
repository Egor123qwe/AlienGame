package CORS

import (
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"net/http"
)

type AllowedOrigins struct {
	AllowedOrigins []string `yaml:"allowed_origins"`
}

func ConfigureCORS(router *mux.Router) http.Handler {

	cors := handlers.CORS(
		handlers.AllowedOrigins([]string{"http://localhost:3000"}),
		handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "DELETE"}),
		handlers.AllowedHeaders([]string{"application/json", "Content-Type", "text/plain"}),
		handlers.AllowCredentials(),
	)
	return cors(router)
}
