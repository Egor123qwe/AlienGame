package gameInitRoutes

import (
	"Olymp/internal/generate"
	"Olymp/internal/routes/routesServices/helperRespond"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
)

var Games = make(map[string]string, 0)

func (i *InitRoutes) GetGameRoute() http.HandlerFunc {
	type Request struct {
		Height int    `json:"height"`
		Width  int    `json:"width"`
		Maze   string `json:"maze"`
	}
	return func(w http.ResponseWriter, r *http.Request) {
		token := mux.Vars(r)["token"]
		game := Games[token]
		if game == "" {
			helperRespond.ErrorHelper(w, http.StatusBadRequest, fmt.Errorf("game not found"))
			return
		}
		helperRespond.Respond(w, http.StatusOK,
			&Request{
				Height: generate.Height,
				Width:  generate.Width,
				Maze:   game,
			})
	}
}
