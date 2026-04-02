# Quickstart: Fix Demo Page Errors

## Running the Application

### 1. Prerequisites
- Node.js installed.
- (Optional) A backend running on port 3000 OR ensure Vite proxy is configured to target the correct local port.

### 2. Frontend Setup
```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

### 3. Verify Fixes
1. Open [http://localhost:5173/demo](http://localhost:5173/demo)
2. Check the **System Alerts** section:
   - Clicking "Sync API" should show a loading state.
   - If the backend is offline, an error message should appear without breaking the UI.
3. Check the **Geolocation Protocol**:
   - If permission is denied, follow the new instructions (tune/lock icon) to reset it.
4. Open the **Console**:
   - Confirm no "CORS policy" or "Uncaught TypeError" related to Autofill services appear.
