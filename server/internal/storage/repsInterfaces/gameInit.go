package repsInterfaces

import "Olymp/internal/models"

type GameInit interface {
	Create() (string, error)
	Get(token string) (*models.Game, error)
	Delete(token string) error
}
