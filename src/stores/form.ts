import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'

export const useFormStore = defineStore('form', () => {
  const currentStep = useLocalStorage('tp-form-current-step', 0)
  const userData = useLocalStorage('tp-form-user-data', {
    name: '',
    email: '',
    address: '',
    city: '',
    preferences: [] as string[],
  })
  const isSubmitted = ref(false)

  const resetForm = () => {
    currentStep.value = 0
    userData.value = {
      name: '',
      email: '',
      address: '',
      city: '',
      preferences: [],
    }
    isSubmitted.value = false
  }

  return {
    currentStep,
    userData,
    isSubmitted,
    resetForm,
  }
})
