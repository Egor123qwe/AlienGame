package gameInitRoutes

import (
	"Olymp/internal/routes/routesServices/helperRespond"
	"encoding/json"
	"fmt"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
	"sync"
)

var mutex = &sync.Mutex{}

type GameData struct {
	APosx  float64 `json:"aPosx"`
	APosy  float64 `json:"aPosy"`
	AFloor int     `json:"aFloor"`
	PPosx  float64 `json:"pPosx"`
	PPosy  float64 `json:"pPosy"`
	PFloor int     `json:"pFloor"`
	WhoWin int     `json:"whoWin"`
}

var GemesSoket = make(map[string]*GameData)

type Message struct {
	X        float64 `json:"x"`
	Y        float64 `json:"y"`
	Floor    int     `json:"floor"`
	IsAlient bool    `json:"isAlient"`
	IsWin    bool    `json:"isWin"`
}

func (i *InitRoutes) CreateGameSocket() http.HandlerFunc {
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
			mutex.Lock()
			game := GemesSoket[token]
			if game == nil {
				helperRespond.ErrorHelper(w, http.StatusBadRequest, fmt.Errorf("game not found"))
				return
			}
			data, err := json.Marshal(map[string]interface{}{
				"aPosx":  game.APosx,
				"aPosy":  game.APosy,
				"aFloor": game.AFloor,
				"pPosx":  game.PPosx,
				"pPosy":  game.PPosy,
				"pFloor": game.PFloor,
				"whoWin": game.WhoWin,
			})
			mutex.Unlock()
			if err != nil {
				log.Println("Ошибка сериализации JSON:", err)
				return
			}
			err = conn.WriteMessage(websocket.TextMessage, data) //game
			if err != nil {
				helperRespond.ErrorHelper(w, http.StatusBadRequest, err)
				return
			}

			_, message, _ := conn.ReadMessage()
			msg := &Message{}
			err = json.Unmarshal(message, &msg)
			if err != nil {
				helperRespond.ErrorHelper(w, http.StatusBadRequest, err)
				return
			}
			mutex.Lock()
			game = GemesSoket[token]
			if msg.IsWin == true {
				if msg.IsAlient {
					game.WhoWin = 1
				} else {
					game.WhoWin = 2
				}
			}
			if msg.IsAlient {
				GemesSoket[token] = &GameData{
					APosx:  msg.X,
					APosy:  msg.Y,
					AFloor: msg.Floor,
					PPosx:  game.PPosx,
					PPosy:  game.PPosy,
					PFloor: game.PFloor,
					WhoWin: game.WhoWin,
				}
			} else {
				GemesSoket[token] = &GameData{
					APosx:  game.APosx,
					APosy:  game.APosy,
					AFloor: game.AFloor,
					PPosx:  msg.X,
					PPosy:  msg.Y,
					PFloor: msg.Floor,
					WhoWin: game.WhoWin,
				}
			}
			mutex.Unlock()
		}
	}
}
