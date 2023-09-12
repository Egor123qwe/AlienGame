package sqlStorage

import (
	"Olymp/internal/storage"
	"Olymp/internal/storage/repsInterfaces"
	"Olymp/internal/storage/sqlStorage/repositories/gameInitRep"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

type Store struct {
	db       *sqlx.DB
	gameInit repsInterfaces.GameInit
}

func New(db *sqlx.DB) storage.Storage {
	return &Store{
		db:       db,
		gameInit: gameInitRep.New(db),
	}
}

func ConfigureStore(dbDriver string, dbURL string) (storage.Storage, error) {
	db, err := sqlx.Open(dbDriver, dbURL)
	if err != nil {
		return nil, err
	}
	if err := db.Ping(); err != nil {
		return nil, err
	}

	return New(db), nil
}

func (s *Store) GameInit() repsInterfaces.GameInit { return s.gameInit }
