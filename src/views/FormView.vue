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
  <div class="form-container">
    <header class="form-header">
      <span class="step-indicator">STEP_0{{ formStore.currentStep + 1 }}</span>
      <h2 class="title">Data_Entry</h2>
    </header>
    
    <Stepper :value="(formStore.currentStep + 1).toString()">
        <StepList class="custom-step-list">
            <Step value="1">Identity</Step>
            <Step value="2">Location</Step>
            <Step value="3">Intel</Step>
        </StepList>
        <StepPanels>
            <StepPanel v-slot="{ activateCallback }" value="1">
                <div class="void-form">
                    <div class="field">
                        <label>User_Name</label>
                        <InputText v-model="formStore.userData.name" placeholder="Enter identification..." />
                    </div>
                    <div class="field">
                        <label>Secure_Email</label>
                        <InputText v-model="formStore.userData.email" placeholder="alias@network.void" />
                    </div>
                </div>
                <div class="actions">
                    <Button label="Proceed" icon="pi pi-chevron-right" iconPos="right" @click="() => { formStore.currentStep = 1; activateCallback('2') }" />
                </div>
            </StepPanel>
            
            <StepPanel v-slot="{ activateCallback }" value="2">
                <div class="void-form">
                    <div class="field">
                        <label>Physical_Address</label>
                        <InputText v-model="formStore.userData.address" placeholder="Sector coordinate..." />
                    </div>
                    <div class="field">
                        <label>Node_City</label>
                        <InputText v-model="formStore.userData.city" placeholder="Urban cluster..." />
                    </div>
                </div>
                <div class="actions">
                    <Button label="Reverse" severity="secondary" icon="pi pi-chevron-left" @click="() => { formStore.currentStep = 0; activateCallback('1') }" />
                    <Button label="Proceed" icon="pi pi-chevron-right" iconPos="right" @click="() => { formStore.currentStep = 2; activateCallback('3') }" />
                </div>
            </StepPanel>
            
            <StepPanel v-slot="{ activateCallback }" value="3">
                <div class="void-form">
                    <label class="section-label">Interest_Vectors</label>
                    <div class="checkbox-group">
                        <div class="check-item">
                            <Checkbox v-model="formStore.userData.preferences" inputId="p1" value="Vue" />
                            <label for="p1">CORE_VUE</label>
                        </div>
                        <div class="check-item">
                            <Checkbox v-model="formStore.userData.preferences" inputId="p2" value="TS" />
                            <label for="p2">TYPED_SCRIPT</label>
                        </div>
                        <div class="check-item">
                            <Checkbox v-model="formStore.userData.preferences" inputId="p3" value="Design" />
                            <label for="p3">VOID_AESTHETICS</label>
                        </div>
                    </div>
                </div>
                <div class="actions">
                    <Button label="Reverse" severity="secondary" icon="pi pi-chevron-left" @click="() => { formStore.currentStep = 1; activateCallback('2') }" />
                    <Button label="Transmit" severity="success" icon="pi pi-bolt" iconPos="right" @click="submitForm" />
                </div>
            </StepPanel>
        </StepPanels>
    </Stepper>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
}

.form-header {
  margin-bottom: 4rem;
}

.step-indicator {
  font-family: var(--font-mono);
  color: var(--accent-color);
  font-size: 0.7rem;
  letter-spacing: 0.3em;
}

.title {
  font-size: 3rem;
  margin-top: 0.5rem;
  color: var(--text-primary);
}

/* PrimeVue Overrides */
:deep(.p-stepper) {
  background: transparent;
}

:deep(.p-stepper-nav) {
  display: none; /* Hide default nav, we have our indicator */
}

:deep(.p-stepper-panels) {
  background: transparent;
  padding: 0;
}

.void-form {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-bottom: 4rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.field label, .section-label {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.2em;
}

:deep(.p-inputtext) {
  background: transparent !important;
  border: none !important;
  border-bottom: 1px solid #222 !important;
  border-radius: 0 !important;
  color: white !important;
  font-size: 1.4rem !important;
  padding: 0.8rem 0 !important;
  font-family: var(--font-main);
  transition: all 0.4s ease;
}

:deep(.p-inputtext:focus) {
  border-bottom-color: var(--accent-color) !important;
  box-shadow: 0 4px 20px -4px var(--accent-glow) !important;
}

:deep(.p-inputtext::placeholder) {
  color: #333;
  font-size: 1rem;
}

.checkbox-group {
  display: grid;
  gap: 1.5rem;
}

.check-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.check-item label {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  cursor: pointer;
}

:deep(.p-checkbox .p-checkbox-box) {
  background: transparent !important;
  border: 1px solid #333 !important;
  border-radius: 0 !important;
}

:deep(.p-checkbox.p-checkbox-checked .p-checkbox-box) {
  border-color: var(--accent-color) !important;
  background: var(--accent-color) !important;
}

.actions {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

:deep(.p-button) {
  background: transparent !important;
  border: 1px solid #222 !important;
  border-radius: 0 !important;
  color: white !important;
  padding: 1rem 2rem !important;
  font-size: 0.7rem !important;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-family: var(--font-mono);
  transition: all 0.4s ease;
}

:deep(.p-button:hover) {
  border-color: var(--accent-color) !important;
  color: var(--accent-color) !important;
  box-shadow: 0 0 20px var(--accent-glow) !important;
}

:deep(.p-button-secondary) {
  opacity: 0.5;
}

:deep(.p-button-success) {
  border-color: var(--accent-color) !important;
  color: var(--accent-color) !important;
}
</style>
