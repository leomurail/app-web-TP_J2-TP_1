# Data Model: Fix Demo Page Errors

## Entities

### Alert
Represents a notification from the backend system.

| Field | Type | Description |
|-------|------|-------------|
| count | Number | The current number of active system notifications |

### DeviceStore (Pinia)
The client-side store managing UI state for system alerts.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| notificationCount | Number | 0 | Value fetched from API or manually incremented |
| isApiSyncing | Boolean | false | Loading state for the API request |
| apiError | String | null | Human-readable error message if fetch fails |

## State Transitions

- **SYNC_START**: `isApiSyncing = true`, `apiError = null`
- **SYNC_SUCCESS**: `notificationCount = response.count`, `isApiSyncing = false`
- **SYNC_FAILURE**: `isApiSyncing = false`, `apiError = "Unable to connect to service"`
