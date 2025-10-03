"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Node {
  id: string
  group: number
}

interface Link {
  source: string
  target: string
  value: number
}

export function D3NetworkGraph() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const width = 500
    const height = 300

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove()

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])

    // Sample data
    const nodes: Node[] = [
      { id: "API Gateway", group: 1 },
      { id: "Auth Service", group: 2 },
      { id: "User Service", group: 2 },
      { id: "Data Service", group: 2 },
      { id: "Cache", group: 3 },
      { id: "Database", group: 3 },
    ]

    const links: Link[] = [
      { source: "API Gateway", target: "Auth Service", value: 1 },
      { source: "API Gateway", target: "User Service", value: 1 },
      { source: "API Gateway", target: "Data Service", value: 1 },
      { source: "User Service", target: "Cache", value: 1 },
      { source: "User Service", target: "Database", value: 1 },
      { source: "Data Service", target: "Database", value: 1 },
    ]

    const color = d3.scaleOrdinal(d3.schemeCategory10)

    const simulation = d3
      .forceSimulation(nodes as any)
      .force(
        "link",
        d3.forceLink(links).id((d: any) => d.id),
      )
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))

    const link = svg
      .append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "hsl(var(--border))")
      .attr("stroke-width", 2)

    const node = svg
      .append("g")
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 8)
      .attr("fill", (d) => color(d.group.toString()))

    const label = svg
      .append("g")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .text((d) => d.id)
      .attr("font-size", 10)
      .attr("dx", 12)
      .attr("dy", 4)
      .attr("fill", "hsl(var(--foreground))")

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y)

      node.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y)

      label.attr("x", (d: any) => d.x).attr("y", (d: any) => d.y)
    })

    return () => {
      simulation.stop()
    }
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Service Network</CardTitle>
        <CardDescription>D3.js force-directed graph of service dependencies</CardDescription>
      </CardHeader>
      <CardContent>
        <svg ref={svgRef} className="w-full" />
      </CardContent>
    </Card>
  )
}
