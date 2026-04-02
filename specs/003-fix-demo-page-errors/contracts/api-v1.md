# API Contract v1 - Alerts

## Endpoint: GET /alerts

Fetches the current count of system notifications.

### Request
- **URL**: `http://localhost:3000/api/v1/alerts`
- **Method**: `GET`
- **Headers**:
  - `Content-Type: application/json`

### Response (Success 200)
```json
{
  "count": 42
}
```

### Response (Error 404/500)
Standard HTTP status codes for failures.
