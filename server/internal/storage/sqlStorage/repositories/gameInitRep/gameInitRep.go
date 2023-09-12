package gameInitRep

import (
	"Olymp/internal/encrypt/code"
	"Olymp/internal/models"
	"Olymp/internal/storage/repsInterfaces"
	"github.com/jmoiron/sqlx"
)

type GameInit struct {
	db *sqlx.DB
}

func New(db *sqlx.DB) repsInterfaces.GameInit {
	return &GameInit{
		db: db,
	}
}

func (g *GameInit) Create() (string, error) {
	code := code.GenerateCode()

	return code, nil
}

func (g *GameInit) Get(token string) (*models.Game, error) {
	return nil, nil
}

func (g *GameInit) Delete(token string) error {
	return nil
}

func (g *GameInit) Init(id int) error {
	return nil
}
