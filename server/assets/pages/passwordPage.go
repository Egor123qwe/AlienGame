package pages

import (
	"Olymp/internal/routes/routesServices/helperRespond"
	"bytes"
	"fmt"
	"github.com/gorilla/mux"
	"html/template"
	"net/http"
)

type actionUrl struct {
	Url string
}

// html
func createPasswordPage(url string) (string, error) {
	tmpl := template.Must(template.New("page").Parse(
		`<!DOCTYPE html>
             <html lang="en">
             <head>
                 <meta charset="UTF-8">
                 <title>change password</title>
             </head>
             <body>
                 <form id="myForm" action={{.Url}} method="POST">
                     <label for="password">Password:</label>
                     <input type="password" id="password" name="password" required><br><br>
                     <input type="submit" value="Отправить">
                 </form>
             </body>
             </html>`,
	))

	actionUrl := actionUrl{Url: url}

	var buf bytes.Buffer
	err := tmpl.Execute(&buf, actionUrl)
	if err != nil {
		return "", err
	}
	return buf.String(), nil
}

func PasswordPageSender(baseUrl string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := mux.Vars(r)["token"]
		page, err := createPasswordPage(baseUrl + "/code/" + token + "/password")
		if err != nil {
			helperRespond.ErrorHelper(w, http.StatusInternalServerError, err)
			return
		}

		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		fmt.Fprint(w, page)
	}
}
