"use client";

import { GraphStore } from "@/lib/stores/graph";

interface Props {
  edge: GraphStore["edges"][number];
}

export function Edge(props: Props) {
  return (
    <line
      x1={props.edge.from.x}
      y1={props.edge.from.y - 16}
      x2={props.edge.to.x}
      y2={props.edge.to.y - 16}
      strokeWidth="2"
      className="stroke-current"
    />
  );
}
