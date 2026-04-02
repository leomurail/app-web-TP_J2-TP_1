# Data Model: Multi-feature Vue TP

## Entity 1: FormState (Pinia Store)
Represents the collective data of the multi-step form.

| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| `currentStep` | `number` | Index of the active form step | `0 <= index < steps.length` |
| `userData` | `object` | Collected user inputs (step 1-3) | Varies per field |
| `isSubmitted` | `boolean` | Final submission status | Default `false` |

## Entity 2: DeviceStatus
State for internal device resources.

| Field | Type | Description |
|-------|------|-------------|
| `geolocation` | `coords: { lat, lng } \| null` | Current coordinates from Browser Geolocation |
| `notificationCount` | `number` | Count of pending/unread alerts |
| `storageStatus` | `boolean` | Availability and space of LocalStorage |

## Relationships
- `FormState` persists to `LocalStorage` (Device Resource).
- `DeviceStatus` updates reactively based on Web APIs.
- Final `FormState` is sent to a remote API.
