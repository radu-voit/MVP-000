"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"

/**
 * DATA STORE CONTEXT
 *
 * Central data management system for the application.
 * Stores both original uploaded data and processed data.
 * All data operations should reference this store.
 *
 * @see docs/DATA_STORE.md for detailed documentation
 */

export interface UploadedFile {
  id: string
  name: string
  type: string
  size: number
  uploadedAt: Date
}

export interface DataStore {
  // Original data as uploaded
  originalData: {
    files: UploadedFile[]
    rawData: Record<string, any[]> // keyed by file ID
  }
  // Processed/transformed data
  processedData: {
    [key: string]: any
  }
  // Metadata about data operations
  metadata: {
    lastUpdated: Date | null
    processingStatus: "idle" | "processing" | "complete" | "error"
    errors: string[]
  }
}

interface DataStoreContextType {
  dataStore: DataStore
  addOriginalData: (fileId: string, fileName: string, fileType: string, fileSize: number, data: any[]) => void
  updateProcessedData: (key: string, data: any) => void
  getOriginalData: (fileId: string) => any[] | undefined
  getProcessedData: (key: string) => any | undefined
  clearDataStore: () => void
  setProcessingStatus: (status: DataStore["metadata"]["processingStatus"]) => void
  addError: (error: string) => void
}

const DataStoreContext = createContext<DataStoreContextType | undefined>(undefined)

export function useDataStore() {
  const context = useContext(DataStoreContext)
  if (!context) {
    throw new Error("useDataStore must be used within a DataStoreProvider")
  }
  return context
}

interface DataStoreProviderProps {
  children: React.ReactNode
}

const initialDataStore: DataStore = {
  originalData: {
    files: [],
    rawData: {},
  },
  processedData: {},
  metadata: {
    lastUpdated: null,
    processingStatus: "idle",
    errors: [],
  },
}

export function DataStoreProvider({ children }: DataStoreProviderProps) {
  const [dataStore, setDataStore] = useState<DataStore>(initialDataStore)

  const addOriginalData = useCallback(
    (fileId: string, fileName: string, fileType: string, fileSize: number, data: any[]) => {
      setDataStore((prev) => ({
        ...prev,
        originalData: {
          files: [
            ...prev.originalData.files,
            {
              id: fileId,
              name: fileName,
              type: fileType,
              size: fileSize,
              uploadedAt: new Date(),
            },
          ],
          rawData: {
            ...prev.originalData.rawData,
            [fileId]: data,
          },
        },
        metadata: {
          ...prev.metadata,
          lastUpdated: new Date(),
        },
      }))
    },
    [],
  )

  const updateProcessedData = useCallback((key: string, data: any) => {
    setDataStore((prev) => ({
      ...prev,
      processedData: {
        ...prev.processedData,
        [key]: data,
      },
      metadata: {
        ...prev.metadata,
        lastUpdated: new Date(),
      },
    }))
  }, [])

  const getOriginalData = useCallback(
    (fileId: string) => {
      return dataStore.originalData.rawData[fileId]
    },
    [dataStore.originalData.rawData],
  )

  const getProcessedData = useCallback(
    (key: string) => {
      return dataStore.processedData[key]
    },
    [dataStore.processedData],
  )

  const clearDataStore = useCallback(() => {
    setDataStore(initialDataStore)
  }, [])

  const setProcessingStatus = useCallback((status: DataStore["metadata"]["processingStatus"]) => {
    setDataStore((prev) => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        processingStatus: status,
      },
    }))
  }, [])

  const addError = useCallback((error: string) => {
    setDataStore((prev) => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        errors: [...prev.metadata.errors, error],
      },
    }))
  }, [])

  return (
    <DataStoreContext.Provider
      value={{
        dataStore,
        addOriginalData,
        updateProcessedData,
        getOriginalData,
        getProcessedData,
        clearDataStore,
        setProcessingStatus,
        addError,
      }}
    >
      {children}
    </DataStoreContext.Provider>
  )
}
