"use client";

import { GraphStore, useGraphStore } from "@/lib/stores/graph";

interface Props {
  edge: GraphStore["edges"][number];
}

export function Edge(props: Props) {
  const { visitedEdges } = useGraphStore();
  const markerEndValue = props.edge.directed ? "url(#arrow)" : "";

  let lineX2 = props.edge.to.x;
  let lineY2 = props.edge.to.y;

  if (props.edge.directed) {
    // Calculate the direction vector from source to target
    const dx = props.edge.to.x - props.edge.from.x;
    const dy = props.edge.to.y - props.edge.from.y;
    const length = Math.sqrt(dx * dx + dy * dy);

    // Node radius
    const nodeRadius = 32;

    // Shorten the line to stop at the edge of the target node
    const shortenedLength = length - nodeRadius;
    const ratio = shortenedLength / length;

    lineX2 = props.edge.from.x + dx * ratio;
    lineY2 = props.edge.from.y + dy * ratio;
  }
  return (
    <g>
      <defs>
        <marker
          id="arrow"
          markerWidth="10"
          markerHeight="10"
          refX="0"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
          stroke="currentcolor"
        >
          <path d="M0,0 L0,6 L9,3 z" />
        </marker>
      </defs>

      <line
        x1={props.edge.from.x}
        y1={props.edge.from.y}
        x2={lineX2}
        y2={lineY2}
        strokeWidth="2"
        style={
          visitedEdges.includes(props.edge.id)
            ? {
                stroke: "currentcolor",
              }
            : {
                stroke: "currentcolor",
                strokeDasharray: "5,5",
              }
        }
        marker-end={markerEndValue}
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
