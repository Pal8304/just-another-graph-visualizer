"use client";

import { GraphStore, useGraphStore } from "@/lib/stores/graph";

interface Props {
  edge: GraphStore["edges"][number];
}

export function Edge(props: Props) {
  const { visitedEdges } = useGraphStore();
  return (
    <g>
      {/* <defs>
        <marker
          id="arrowhead"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" />
        </marker>
      </defs> */}
      <line
        x1={props.edge.from.x}
        y1={props.edge.from.y}
        x2={props.edge.to.x}
        y2={props.edge.to.y}
        strokeWidth="2"
        style={
          // props.edge.weight === 1
          //   ? { stroke: "black" }
          //   : { stroke: "black", strokeDasharray: "5,5" }
          visitedEdges.includes(props.edge.id)
            ? {
                stroke: "currentcolor",
              }
            : {
                stroke: "currentcolor",
                strokeDasharray: "5,5",
              }
        }
        // markerEnd="url(#arrowhead)"
      />
      <text
        x={(props.edge.from.x + props.edge.to.x) / 2}
        y={(props.edge.from.y + props.edge.to.y) / 2}
        className="text-lg fill-current font-bold"
      >
        {props.edge.weight}
      </text>
    </g>
  );
}
