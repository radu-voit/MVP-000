"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface SubtaskCardProps {
  stepNumber: number
  taskNumber: number
  TaskComponent: React.ComponentType
}

export function SubtaskCard({ stepNumber, taskNumber, TaskComponent }: SubtaskCardProps) {
  const taskName = `Step ${stepNumber} - Task ${taskNumber}`

  return (
    <Card className="hover:border-primary transition-colors border-primary/30">
      <CardContent className="p-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="default" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              Task {taskNumber}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-2">
              <h4 className="font-semibold">{taskName}</h4>
              <TaskComponent />
            </div>
          </PopoverContent>
        </Popover>
      </CardContent>
    </Card>
  )
}
