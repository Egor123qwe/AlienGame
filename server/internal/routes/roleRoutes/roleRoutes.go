package roleRoutes

import (
	"Olymp/internal/storage"
)

type RoleRoutes struct {
	storage storage.Storage
}

func New(storage storage.Storage) *RoleRoutes {
	return &RoleRoutes{
		storage: storage,
	}
}
