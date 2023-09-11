package middlewares

import (
	"Olymp/internal/storage"
	"net/http"
)

type MiddlewareFunc = func(next http.Handler) http.Handler

type Middlewares interface {
	ServerMiddleware(next http.Handler) http.Handler
}

type Auth struct {
	store storage.Storage
}

func New(store storage.Storage) Middlewares {
	return &Auth{
		store: store,
	}
}
