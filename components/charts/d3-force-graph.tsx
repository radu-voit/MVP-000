"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function D3ForceGraph() {
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

    // Generate hierarchical data
    const data = {
      name: "Root",
      children: [
        {
          name: "Branch A",
          children: [
            { name: "Leaf A1", value: 100 },
            { name: "Leaf A2", value: 150 },
          ],
        },
        {
          name: "Branch B",
          children: [
            { name: "Leaf B1", value: 120 },
            { name: "Leaf B2", value: 180 },
            { name: "Leaf B3", value: 90 },
          ],
        },
      ],
    }

    const root = d3.hierarchy(data)
    const links = root.links()
    const nodes = root.descendants()

    const simulation = d3
      .forceSimulation(nodes as any)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d: any) => d.id)
          .distance(50)
          .strength(1),
      )
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2))

    const link = svg
      .append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "hsl(var(--chart-2))")
      .attr("stroke-width", 1.5)

    const node = svg
      .append("g")
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", (d) => (d.children ? 10 : 6))
      .attr("fill", (d) => (d.children ? "hsl(var(--chart-1))" : "hsl(var(--chart-3))"))

    const label = svg
      .append("g")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .text((d: any) => d.data.name)
      .attr("font-size", 9)
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
        <CardTitle>Hierarchical Data</CardTitle>
        <CardDescription>D3.js hierarchical force layout visualization</CardDescription>
      </CardHeader>
      <CardContent>
        <svg ref={svgRef} className="w-full" />
      </CardContent>
    </Card>
  )
}
