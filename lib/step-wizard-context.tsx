"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"

interface StepData {
  [key: string]: any
}

interface StepCompletion {
  [stepIndex: number]: boolean
}

interface StepWizardContextType {
  currentStep: number
  totalSteps: number
  stepData: StepData
  completedSteps: StepCompletion
  markStepComplete: (step: number) => void
  markStepIncomplete: (step: number) => void
  isStepComplete: (step: number) => boolean
  canNavigateToStep: (step: number) => boolean
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
  const [completedSteps, setCompletedSteps] = useState<StepCompletion>({})

  const markStepComplete = useCallback((step: number) => {
    setCompletedSteps((prev) => ({ ...prev, [step]: true }))
  }, [])

  const markStepIncomplete = useCallback((step: number) => {
    setCompletedSteps((prev) => ({ ...prev, [step]: false }))
  }, [])

  const isStepComplete = useCallback(
    (step: number) => {
      return completedSteps[step] === true
    },
    [completedSteps],
  )

  // User can only navigate to a step if all previous steps are complete
  const canNavigateToStep = useCallback(
    (step: number) => {
      // Can always go back to previous steps
      if (step <= currentStep) {
        return true
      }
      // Can only go forward if all previous steps are complete
      for (let i = 0; i < step; i++) {
        if (!completedSteps[i]) {
          return false
        }
      }
      return true
    },
    [currentStep, completedSteps],
  )

  const goToStep = useCallback(
    (step: number) => {
      if (step >= 0 && step < totalSteps && canNavigateToStep(step)) {
        setCurrentStep(step)
      }
    },
    [totalSteps, canNavigateToStep],
  )

  const nextStep = useCallback(() => {
    if (completedSteps[currentStep] && currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }, [currentStep, totalSteps, completedSteps])

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }, [])

  const updateStepData = useCallback((data: Partial<StepData>) => {
    setStepData((prev) => ({ ...prev, ...data }))
  }, [])

  const resetWizard = useCallback(() => {
    setCurrentStep(initialStep)
    setStepData({})
    setCompletedSteps({})
  }, [initialStep])

  const canGoNext = currentStep < totalSteps - 1 && completedSteps[currentStep] === true
  const canGoPrev = currentStep > 0

  return (
    <StepWizardContext.Provider
      value={{
        currentStep,
        totalSteps,
        stepData,
        completedSteps,
        markStepComplete,
        markStepIncomplete,
        isStepComplete,
        canNavigateToStep,
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
