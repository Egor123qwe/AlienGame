package helperRespond

import (
	"encoding/json"
	"net/http"
)

type ErrorResponse struct {
	Error string `json:"message"`
}

func ErrorHelper(w http.ResponseWriter, code int, err error) {
	Respond(w, code, ErrorResponse{Error: err.Error()})
}

func Respond(w http.ResponseWriter, code int, data interface{}) {
	w.WriteHeader(code)
	if data != nil {
		json.NewEncoder(w).Encode(data)
	}
}
