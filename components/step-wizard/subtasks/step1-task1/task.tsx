"use client"

import { useDataStore } from "@/lib/data-store-context"

export function Step1Task1() {
  const { dataStore } = useDataStore()

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">
        This is <span className="font-semibold">Step 1 - Task 1</span>
      </p>
      <p className="text-xs">Files uploaded: {dataStore.originalData.files.length}</p>
    </div>
  )
}
