package gameInitRep

import (
	"Olymp/internal/encrypt/code"
	"Olymp/internal/models"
	"Olymp/internal/storage/repsInterfaces"
	"database/sql"
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
	if err := g.db.QueryRow(
		"INSERT INTO games_status (code) VALUES ($1);",
		code,
	).Scan(); err != nil && err != sql.ErrNoRows {
		return "", err
	}
	return code, nil
}

func (g *GameInit) Get(token string) (*models.Game, error) {
	game := &models.Game{}
	if err := g.db.QueryRow(
		"SELECT id, code FROM games_status WHERE code = $1;",
		token,
	).Scan(
		&game.Id, &game.Code,
	); err != nil {
		return nil, err
	}
	return game, nil
}

func (g *GameInit) Delete(token string) error {
	if err := g.db.QueryRow("DELETE FROM games_status WHERE code = $1;", token).Scan(); err != nil {
		if err != sql.ErrNoRows {
			return err
		}
	}
	return nil
}
