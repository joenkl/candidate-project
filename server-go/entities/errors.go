package entities

var (

	//NotFound response
	NotFound = map[string]string{"error": "Not found"}
	//InvalidPayload response
	InvalidPayload = map[string]string{"error": "Invalid payload"}
	//DbInsertError response
	DbInsertError = map[string]string{"error": "Failed to create"}
)

//HTTPError type
type HTTPError struct {
	Error string `json:"error"`
}
