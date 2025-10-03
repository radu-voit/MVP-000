"use client"

import { useDataStore } from "@/lib/data-store-context"

export function Step1Task2() {
  const { dataStore } = useDataStore()

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">
        This is <span className="font-semibold">Step 1 - Task 2</span>
      </p>
      <p className="text-xs">Processing status: {dataStore.metadata.processingStatus}</p>
    </div>
  )
}
