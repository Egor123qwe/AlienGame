package gameInitRoutes

import (
	"Olymp/internal/routes/routesServices/helperRespond"
	"encoding/json"
	"net/http"
)

func (i *InitRoutes) ConfigureInitRoutes() {
	i.server.Router.HandleFunc("/host", i.CreateInitGameRoute()).Methods("GET")
	i.server.Router.HandleFunc("/client", i.CreateConnectGameRoute()).Methods("POST")
}

func (i *InitRoutes) CreateInitGameRoute() http.HandlerFunc {
	type Request struct {
		Code string `json:"code"`
	}
	return func(w http.ResponseWriter, r *http.Request) {
		code, err := i.server.Store.GameInit().Create()
		if err != nil {
			helperRespond.ErrorHelper(w, http.StatusBadRequest, err)
		}
		//web soket
		helperRespond.Respond(w, http.StatusOK, &Request{Code: code})
	}
}

func (i *InitRoutes) CreateConnectGameRoute() http.HandlerFunc {
	type Response struct {
		Code string `json:"code"`
	}
	return func(w http.ResponseWriter, r *http.Request) {
		var res Response
		if err := json.NewDecoder(r.Body).Decode(&res); err != nil {
			helperRespond.ErrorHelper(w, http.StatusBadRequest, err)
			return
		}
		game, err := i.server.Store.GameInit().Get(res.Code)
		if err != nil {
			helperRespond.ErrorHelper(w, http.StatusBadRequest, err)
			return
		}
		if err := i.server.Store.GameInit().Init(game.Id); err != nil {
			helperRespond.ErrorHelper(w, http.StatusBadRequest, err)
			return
		}
		//Гененрация игры
		//отдать карту и позицию хосту
		//отдать карту и позицию клиенту
		//web soket
		helperRespond.Respond(w, http.StatusOK, res.Code)
	}
}
