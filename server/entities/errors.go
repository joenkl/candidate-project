package entities

var (

	//NotFound response
	NotFound = map[string]string{"error": "Not found"}
	//InvalidPayload response
	InvalidPayload = map[string]string{"error": "Invalid payload"}
)

//HTTPError type
type HTTPError struct {
	Error string `json:"error"`
}
