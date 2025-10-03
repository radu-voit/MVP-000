"use client"

import { useCallback, useEffect } from "react"
import { useStepWizard } from "@/lib/step-wizard-context"
import {
  ReactFlow,
  type Node,
  type Edge,
  addEdge,
  Background,
  Controls,
  MiniMap,
  type Connection,
  useNodesState,
  useEdgesState,
  MarkerType,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"

const initialNodes: Node[] = [
  {
    id: "1",
    type: "input",
    data: { label: "Start" },
    position: { x: 250, y: 0 },
  },
  {
    id: "2",
    data: { label: "Process" },
    position: { x: 250, y: 100 },
  },
  {
    id: "3",
    type: "output",
    data: { label: "End" },
    position: { x: 250, y: 200 },
  },
]

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    markerEnd: { type: MarkerType.ArrowClosed },
  },
]

export function ReactFlowStep() {
  const { stepData, updateStepData } = useStepWizard()
  const [nodes, setNodes, onNodesChange] = useNodesState(stepData.flowNodes || initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(stepData.flowEdges || initialEdges)

  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges])

  useEffect(() => {
    updateStepData({ flowNodes: nodes, flowEdges: edges })
  }, [nodes, edges, updateStepData])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Design Your Flow</h2>
        <p className="text-muted-foreground">Create and customize your workflow diagram</p>
      </div>

      {stepData.selectedOption && (
        <div className="rounded-lg bg-muted p-4">
          <p className="text-sm text-muted-foreground">
            Selected option from previous step:{" "}
            <span className="font-semibold text-foreground">{stepData.selectedOption}</span>
          </p>
        </div>
      )}

      <div className="h-[500px] rounded-lg border border-border bg-background">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  )
}
