package code

import (
	"math/rand"
	"time"
)

const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

func GenerateCode() string {
	rand.Seed(time.Now().UnixNano())
	code := make([]byte, 10)
	for i := range code {
		code[i] = chars[rand.Intn(len(chars))]
	}
	return string(code)
}
