"use client"

import { SubtaskCard } from "./subtask-card"
import { Step1Task1 } from "./step1-task1/task"
import { Step1Task2 } from "./step1-task2/task"
import { Step1Task3 } from "./step1-task3/task"
import { Step2Task1 } from "./step2-task1/task"
import { Step2Task2 } from "./step2-task2/task"
import { Step2Task3 } from "./step2-task3/task"
import { Step3Task1 } from "./step3-task1/task"
import { Step3Task2 } from "./step3-task2/task"
import { Step3Task3 } from "./step3-task3/task"
import { Step4Task1 } from "./step4-task1/task"
import { Step4Task2 } from "./step4-task2/task"
import { Step4Task3 } from "./step4-task3/task"

interface SubtaskContainerProps {
  stepNumber: number
}

export function SubtaskContainer({ stepNumber }: SubtaskContainerProps) {
  const taskComponents = {
    1: [Step1Task1, Step1Task2, Step1Task3],
    2: [Step2Task1, Step2Task2, Step2Task3],
    3: [Step3Task1, Step3Task2, Step3Task3],
    4: [Step4Task1, Step4Task2, Step4Task3],
  }

  const tasks = taskComponents[stepNumber as keyof typeof taskComponents] || []

  return (
    <div className="w-full">
      <h3 className="mb-4 text-sm font-semibold text-muted-foreground">Subtasks</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {tasks.map((TaskComponent, index) => (
          <SubtaskCard key={index} stepNumber={stepNumber} taskNumber={index + 1} TaskComponent={TaskComponent} />
        ))}
      </div>
    </div>
  )
}
