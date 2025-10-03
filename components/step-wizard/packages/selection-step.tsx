"use client"

import { useState, useEffect } from "react"
import { useStepWizard } from "@/lib/step-wizard-context"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

const options = [
  { id: "option1", title: "Option 1", description: "First choice for your workflow" },
  { id: "option2", title: "Option 2", description: "Second choice for your workflow" },
  { id: "option3", title: "Option 3", description: "Third choice for your workflow" },
]

export function SelectionStep() {
  const { stepData, updateStepData } = useStepWizard()
  const [selected, setSelected] = useState<string>(stepData.selectedOption || "")

  useEffect(() => {
    if (selected) {
      updateStepData({ selectedOption: selected })
    }
  }, [selected, updateStepData])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Choose Your Option</h2>
        <p className="text-muted-foreground">Select the option that best fits your needs</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {options.map((option) => (
          <Card
            key={option.id}
            className={cn(
              "relative cursor-pointer border-2 p-6 transition-all hover:border-primary/50",
              selected === option.id ? "border-primary bg-primary/5" : "border-border",
            )}
            onClick={() => setSelected(option.id)}
          >
            {selected === option.id && (
              <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="h-4 w-4" />
              </div>
            )}
            <h3 className="mb-2 text-lg font-semibold">{option.title}</h3>
            <p className="text-sm text-muted-foreground">{option.description}</p>
          </Card>
        ))}
      </div>

      {stepData.name && (
        <div className="rounded-lg bg-muted p-4">
          <p className="text-sm text-muted-foreground">
            Data from previous step: <span className="font-semibold text-foreground">{stepData.name}</span>
          </p>
        </div>
      )}
    </div>
  )
}
