# API Contract: Vue TP Application

## POST /api/v1/form-submission
Submits final multi-step form data.

**Request Header**: `Content-Type: application/json`
**Request Body**:
```json
{
  "userId": "uuid",
  "step1Data": { "name": "string", "email": "string" },
  "step2Data": { "address": "string", "city": "string" },
  "step3Data": { "preferences": ["string"] }
}
```

**Response 201 Created**:
```json
{
  "success": true,
  "submissionId": "uuid",
  "message": "Form submitted successfully"
}
```

## GET /api/v1/alerts
Fetches pending notifications for the user.

**Response 200 OK**:
```json
{
  "count": 5,
  "alerts": [
    { "id": "uuid", "message": "New alert received", "timestamp": "ISO8601" }
  ]
}
```
