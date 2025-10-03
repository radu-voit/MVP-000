"use client"

import { useDataStore } from "@/lib/data-store-context"

export function Step3Task2() {
  const { dataStore } = useDataStore()

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">
        This is <span className="font-semibold">Step 3 - Task 2</span>
      </p>
      <p className="text-xs">Data store status: {dataStore.metadata.processingStatus}</p>
    </div>
  )
}
