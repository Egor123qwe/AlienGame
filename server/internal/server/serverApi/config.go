package serverApi

import (
	"github.com/spf13/viper"
	"log"
)

type config struct {
	serverPort string
	dbURL      string
	dbDriver   string
}

func NewConfig() *config {
	viper.AddConfigPath("configs")
	viper.SetConfigName("main_config")
	if err := viper.ReadInConfig(); err != nil {
		log.Fatal(err)
	}

	return &config{
		serverPort: viper.GetString("server_port"),
		dbURL:      viper.GetString("db_url"),
		dbDriver:   viper.GetString("db_driver_name"),
	}
}
