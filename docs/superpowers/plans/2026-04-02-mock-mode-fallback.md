# Mock Mode Fallback Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a fallback "Mock Mode" for the System Alerts synchronization when the backend API is unavailable (404 error).

**Architecture:** Update the Pinia store to track mock state and modify the component's fetch logic to intercept 404 errors and trigger a simulated response.

**Tech Stack:** Vue 3, Pinia, Axios

---

### Task 1: Update DeviceStore with Mock Mode State

**Files:**
- Modify: `src/stores/device.ts`

- [ ] **Step 1: Add isMockMode to state and actions**

```typescript
export const useDeviceStore = defineStore('device', () => {
  // ... existing state
  const isMockMode = ref(false)

  // ... existing actions
  const setMockMode = (active: boolean) => {
    isMockMode.value = active
  }

  return {
    // ...
    isMockMode,
    setMockMode
  }
})
```

- [ ] **Step 2: Commit**

```bash
git add src/stores/device.ts
git commit -m "feat: add isMockMode to DeviceStore"
```

---

### Task 2: Implement Mock Fallback Logic in DemoView

**Files:**
- Modify: `src/views/DemoView.vue`

- [ ] **Step 1: Update fetchAlerts with 404 intercept and simulation**

```typescript
const fetchAlerts = async () => {
  deviceStore.syncStart()
  try {
    const response = await api.get('/alerts')
    if (response.data && response.data.count !== undefined) {
      deviceStore.setMockMode(false)
      deviceStore.syncSuccess(response.data.count)
    }
  } catch (err: any) {
    if (err.response?.status === 404 || err.code === 'ERR_NETWORK') {
      // Trigger Mock Mode
      deviceStore.setMockMode(true)
      setTimeout(() => {
        // Simulate a random count between 1 and 10 for the demo
        const mockCount = Math.floor(Math.random() * 10) + 1
        deviceStore.syncSuccess(deviceStore.notificationCount + mockCount)
      }, 800)
      return
    }
    
    const message = err.response?.data?.message || err.message || 'Unable to connect to service'
    deviceStore.syncFailure(message)
  }
}
```

- [ ] **Step 2: Update UI to show Mock Mode status**

```html
<div v-if="deviceStore.apiError" class="status-msg error mt-2">
  System: {{ deviceStore.apiError }}
</div>
<div v-else-if="deviceStore.isMockMode" class="status-msg highlight mt-2">
  <span class="pulse-dot"></span> System: Mock Mode Active (Local Sync)
</div>
```

- [ ] **Step 3: Commit**

```bash
git add src/views/DemoView.vue
git commit -m "feat: implement mock fallback for 404 API errors"
```
