"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"

interface StepData {
  [key: string]: any
}

interface StepWizardContextType {
  currentStep: number
  totalSteps: number
  stepData: StepData
  goToStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  updateStepData: (data: Partial<StepData>) => void
  resetWizard: () => void
  canGoNext: boolean
  canGoPrev: boolean
}

const StepWizardContext = createContext<StepWizardContextType | undefined>(undefined)

export function useStepWizard() {
  const context = useContext(StepWizardContext)
  if (!context) {
    throw new Error("useStepWizard must be used within a StepWizardProvider")
  }
  return context
}

interface StepWizardProviderProps {
  children: React.ReactNode
  totalSteps: number
  initialStep?: number
}

export function StepWizardProvider({ children, totalSteps, initialStep = 0 }: StepWizardProviderProps) {
  const [currentStep, setCurrentStep] = useState(initialStep)
  const [stepData, setStepData] = useState<StepData>({})

  const goToStep = useCallback(
    (step: number) => {
      if (step >= 0 && step < totalSteps) {
        setCurrentStep(step)
      }
    },
    [totalSteps],
  )

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1))
  }, [totalSteps])

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }, [])

  const updateStepData = useCallback((data: Partial<StepData>) => {
    setStepData((prev) => ({ ...prev, ...data }))
  }, [])

  const resetWizard = useCallback(() => {
    setCurrentStep(initialStep)
    setStepData({})
  }, [initialStep])

  const canGoNext = currentStep < totalSteps - 1
  const canGoPrev = currentStep > 0

  return (
    <StepWizardContext.Provider
      value={{
        currentStep,
        totalSteps,
        stepData,
        goToStep,
        nextStep,
        prevStep,
        updateStepData,
        resetWizard,
        canGoNext,
        canGoPrev,
      }}
    >
      {children}
    </StepWizardContext.Provider>
  )
}
