package routes

import (
	"Olymp/internal/routes/gameInitRoutes"
	"Olymp/internal/server"
)

func ConfigureRotes(s *server.Server) {
	gameInitRoutes.New(s).Start()
}
