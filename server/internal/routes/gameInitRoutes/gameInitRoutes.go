package gameInitRoutes

import (
	"Olymp/internal/server"
)

type InitRoutes struct {
	server *server.Server
}

func New(server *server.Server) *InitRoutes {
	return &InitRoutes{
		server: server,
	}
}

func (i *InitRoutes) Start() {
	i.ConfigureInitRoutes()
}
