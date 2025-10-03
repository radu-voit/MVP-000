"use client"

import { useDataStore } from "@/lib/data-store-context"

export function Step1Task3() {
  const { dataStore } = useDataStore()

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">
        This is <span className="font-semibold">Step 1 - Task 3</span>
      </p>
      <p className="text-xs">Last updated: {dataStore.metadata.lastUpdated?.toLocaleString() || "Never"}</p>
    </div>
  )
}
