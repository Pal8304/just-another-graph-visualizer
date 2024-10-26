"use client";

import { GraphStore } from "@/lib/stores/graph";

interface Props {
  edge: GraphStore["edges"][number];
}

export function Edge(props: Props) {
  return (
    <g>
      <line
        x1={props.edge.from.x}
        y1={props.edge.from.y - 16}
        x2={props.edge.to.x}
        y2={props.edge.to.y - 16}
        strokeWidth="2"
        className="stroke-current"
      />
      <text
        x={(props.edge.from.x + props.edge.to.x) / 2}
        y={(props.edge.from.y + props.edge.to.y) / 2}
        className="text-xs fill-current"
      >
        {props.edge.weight}
      </text>
    </g>
  );
}
