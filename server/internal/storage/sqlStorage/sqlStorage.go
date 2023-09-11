package sqlStorage

import (
	"Olymp/internal/storage"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

type Store struct {
	db *sqlx.DB
}

func New(db *sqlx.DB) storage.Storage {
	return &Store{
		db: db,
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
