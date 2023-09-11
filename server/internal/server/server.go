package server

import (
	"Olymp/internal/middlewares"
	"Olymp/internal/storage"
	"github.com/gorilla/mux"
)

type Server struct {
	Router      *mux.Router
	Middlewares middlewares.Middlewares
	Store       storage.Storage
}

func NewServer(store storage.Storage) *Server {
	s := &Server{
		Router:      mux.NewRouter(),
		Middlewares: middlewares.New(store),
		Store:       store,
	}
	return s
}
