package middlewares

import (
	"errors"
	"net/http"
)

var TokenNotCorrectErr = errors.New("key is not correct")

func (a *Auth) ServerMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		next.ServeHTTP(w, r)
	})
}
