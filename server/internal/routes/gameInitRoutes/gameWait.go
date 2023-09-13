package gameInitRoutes

import (
	"Olymp/internal/routes/routesServices/helperRespond"
	"database/sql"
	"github.com/gorilla/websocket"
	"net/http"
)

var (
	upgrader = websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}
)

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
