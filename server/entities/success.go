package entities

//SuccessResponse type
type SuccessResponse struct {
	Status string `json:"status"`
}

//Response for success
func (s *SuccessResponse) Response(message string) SuccessResponse {
	return SuccessResponse{
		Status: message,
	}
}
