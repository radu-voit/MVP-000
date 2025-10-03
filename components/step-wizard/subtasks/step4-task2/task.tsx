"use client"

import { useDataStore } from "@/lib/data-store-context"

export function Step4Task2() {
  const { dataStore } = useDataStore()

  const latestFile = dataStore.originalData.files[dataStore.originalData.files.length - 1]

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">
        This is <span className="font-semibold">Step 4 - Task 2</span>
      </p>
      <p className="text-xs">Viewing file: {latestFile?.name || "No file"}</p>
    </div>
  )
}
