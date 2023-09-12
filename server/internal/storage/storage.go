package storage

import "Olymp/internal/storage/repsInterfaces"

type Storage interface {
	GameInit() repsInterfaces.GameInit
}
