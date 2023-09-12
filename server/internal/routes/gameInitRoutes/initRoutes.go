package gameInitRoutes

import (
	"Olymp/internal/routes/routesServices/helperRespond"
	"database/sql"
	"encoding/json"
	"github.com/gorilla/websocket"
	"net/http"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func (i *InitRoutes) ConfigureInitRoutes() {
	i.server.Router.HandleFunc("/host", i.CreateInitGameRoute()).Methods("GET")
	i.server.Router.HandleFunc("/client", i.CreateConnectGameRoute()).Methods("POST")
	i.server.Router.HandleFunc("/wait", i.CreateWaitGameSocket()).Methods("GET")
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
		if err := i.server.Store.GameInit().Delete(game.Code); err != nil {
			helperRespond.ErrorHelper(w, http.StatusBadRequest, err)
			return
		}
		//Гененрация игры
		helperRespond.Respond(w, http.StatusOK, res.Code)
	}
}

func (i *InitRoutes) CreateWaitGameSocket() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		conn, err := upgrader.Upgrade(w, r, nil)
		if err != nil {
			helperRespond.ErrorHelper(w, http.StatusBadRequest, err)
			return
		}
		defer conn.Close()

		_, message, err := conn.ReadMessage()
		token := string(message)
		for {
			_, err = i.server.Store.GameInit().Get(token)
			if err == sql.ErrNoRows {
				err = conn.WriteMessage(websocket.TextMessage, []byte("ready"))
				return
			}
		}
	}
}
