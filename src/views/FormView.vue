<script setup lang="ts">
import { useFormStore } from '@/stores/form'
import Stepper from 'primevue/stepper'
import StepList from 'primevue/steplist'
import StepPanels from 'primevue/steppanels'
import Step from 'primevue/step'
import StepPanel from 'primevue/steppanel'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Checkbox from 'primevue/checkbox'
import api from '@/services/api'

const formStore = useFormStore()

const submitForm = async () => {
  try {
    const response = await api.post('/form-submission', {
      userData: formStore.userData,
      userId: crypto.randomUUID(),
    })
    if (response.data.success) {
      formStore.isSubmitted = true
      alert('Form successfully submitted!')
      formStore.resetForm()
    }
  } catch (error) {
    console.error('Submission failed', error)
    alert('Submission logged in darkness (Mock Success).')
    formStore.isSubmitted = true
    formStore.resetForm()
  }
}
</script>

<template>
  <div class="form-page">
    <header class="form-header">
      <div class="header-content">
        <span class="step-tag">Protocol 0{{ formStore.currentStep + 1 }}</span>
        <h2 class="title">Data Entry</h2>
        <p class="subtitle">Secure multi-step synchronization of user identification and preferences.</p>
      </div>
    </header>
    
    <div class="form-wrapper">
      <Stepper :value="(formStore.currentStep + 1).toString()">
          <StepList class="void-stepper-list">
              <Step value="1" class="void-step">Identity</Step>
              <Step value="2" class="void-step">Location</Step>
              <Step value="3" class="void-step">Intel</Step>
          </StepList>
          
          <StepPanels class="void-panels">
              <!-- Step 1: Identity -->
              <StepPanel v-slot="{ activateCallback }" value="1">
                  <div class="step-content">
                      <div class="fields-group">
                          <div class="field">
                              <label>User Name</label>
                              <InputText v-model="formStore.userData.name" placeholder="Enter identification code..." />
                          </div>
                          <div class="field">
                              <label>Secure Email</label>
                              <InputText v-model="formStore.userData.email" placeholder="alias@network.void" />
                          </div>
                      </div>
                      <div class="actions justify-end">
                          <Button label="Proceed" icon="pi pi-arrow-right" iconPos="right" @click="() => { formStore.currentStep = 1; activateCallback('2') }" />
                      </div>
                  </div>
              </StepPanel>
              
              <!-- Step 2: Location -->
              <StepPanel v-slot="{ activateCallback }" value="2">
                  <div class="step-content">
                      <div class="fields-group">
                          <div class="field">
                              <label>Physical Address</label>
                              <InputText v-model="formStore.userData.address" placeholder="Sector coordinates..." />
                          </div>
                          <div class="field">
                              <label>Node City</label>
                              <InputText v-model="formStore.userData.city" placeholder="Urban cluster identification..." />
                          </div>
                      </div>
                      <div class="actions">
                          <Button label="Reverse" severity="secondary" @click="() => { formStore.currentStep = 0; activateCallback('1') }" />
                          <Button label="Proceed" icon="pi pi-arrow-right" iconPos="right" @click="() => { formStore.currentStep = 2; activateCallback('3') }" />
                      </div>
                  </div>
              </StepPanel>
              
              <!-- Step 3: Intel -->
              <StepPanel v-slot="{ activateCallback }" value="3">
                  <div class="step-content">
                      <div class="fields-group">
                          <label class="group-label">Interest Vectors</label>
                          <div class="checkbox-grid">
                              <div class="check-item" :class="{ selected: formStore.userData.preferences.includes('Vue') }">
                                  <Checkbox v-model="formStore.userData.preferences" inputId="p1" value="Vue" />
                                  <label for="p1">Core Vue Engine</label>
                              </div>
                              <div class="check-item" :class="{ selected: formStore.userData.preferences.includes('TS') }">
                                  <Checkbox v-model="formStore.userData.preferences" inputId="p2" value="TS" />
                                  <label for="p2">Typed Script Layer</label>
                              </div>
                              <div class="check-item" :class="{ selected: formStore.userData.preferences.includes('Design') }">
                                  <Checkbox v-model="formStore.userData.preferences" inputId="p3" value="Design" />
                                  <label for="p3">Void Aesthetics</label>
                              </div>
                          </div>
                      </div>
                      <div class="actions">
                          <Button label="Reverse" severity="secondary" @click="() => { formStore.currentStep = 1; activateCallback('2') }" />
                          <Button label="Transmit Data" severity="success" icon="pi pi-bolt" iconPos="right" @click="submitForm" />
                      </div>
                  </div>
              </StepPanel>
          </StepPanels>
      </Stepper>
    </div>
  </div>
</template>

<style scoped>
.form-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 0;
}

.form-header {
  margin-bottom: var(--app-padding-y);
  border-left: 1px solid var(--accent-color);
  padding-left: 2rem;
}

.step-tag {
  font-family: var(--font-mono);
  color: var(--accent-color);
  font-size: 0.7rem;
  letter-spacing: 0.4em;
  text-transform: uppercase;
}

.title {
  font-size: clamp(2.5rem, 10vw, 4rem);
  margin: 0.5rem 0;
  color: var(--text-primary);
  text-transform: uppercase;
}

.subtitle {
  color: var(--text-secondary);
  font-size: 1rem;
  max-width: 500px;
  line-height: 1.6;
}

/* Stepper Customization */
.form-wrapper {
  background: transparent;
  border: none;
  padding: 0;
  position: relative;
}

:deep(.p-stepper) {
  background: transparent !important;
}

:deep(.void-stepper-list) {
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
  border-bottom: 1px solid #111;
  padding-bottom: 1.5rem;
  background: transparent !important;
  gap: 1.5rem;
}

@media (max-width: 768px) {
  :deep(.void-stepper-list) {
    gap: 0.5rem;
    margin-bottom: 2rem;
  }
  
  :deep(.void-step) {
    font-size: 0.55rem !important;
    letter-spacing: 0.1em;
  }
}

:deep(.void-step) {
  background: transparent !important;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #333 !important;
  padding: 0 !important;
  flex: 1;
}

:deep(.p-stepper-action) {
    background: transparent !important;
    padding: 0 !important;
}

:deep(.p-steppanels) {
  background: transparent !important;
  padding: 0 !important;
  border: none !important;
}

:deep(.p-steppanel) {
  background: transparent !important;
}

.step-content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.fields-group {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.field label, .group-label {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  color: #444;
  text-transform: uppercase;
  letter-spacing: 0.3em;
}

:deep(.p-inputtext) {
  background: transparent !important;
  border: none !important;
  border-bottom: 1px solid #222 !important;
  border-radius: 0 !important;
  color: white !important;
  font-size: clamp(1.2rem, 5vw, 1.6rem) !important;
  padding: 1rem 0 !important;
  font-family: var(--font-main);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;
}

:deep(.p-inputtext:focus) {
  border-bottom-color: var(--accent-color) !important;
}

:deep(.p-inputtext::placeholder) {
  color: #222;
  font-size: 1.1rem;
}

/* Checkbox Grid */
.checkbox-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.check-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  border: 1px solid #111;
  transition: all 0.4s ease;
  cursor: pointer;
}

.check-item.selected {
  border-color: var(--accent-color);
  background: rgba(0, 240, 255, 0.02);
}

/* Actions */
.actions {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.justify-end { justify-content: flex-end; }

:deep(.p-button) {
  background: transparent !important;
  border: 1px solid #222 !important;
  border-radius: 0 !important;
  color: white !important;
  padding: 1rem 2rem !important;
  font-size: 0.75rem !important;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  font-family: var(--font-mono);
  transition: all 0.4s ease;
}

@media (max-width: 768px) {
  .actions {
    flex-direction: column;
  }
  
  :deep(.p-button) {
    width: 100%;
  }

  .form-header {
    margin-bottom: 3rem;
  }
}
</style>
