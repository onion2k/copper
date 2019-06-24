import React from "react";
import { Node } from "./node";

interface iOutput {
  key: string;
  id: string;
  title?: string;
  direction: string;
  index: number | null;
  value: number | string | undefined;
}

export function Output({ id, direction, index, value }: iOutput) {
  const display =
    typeof value === "number"
      ? value.toFixed(3)
      : typeof value === "string"
      ? value.length > 15
        ? value.substr(0, 15).trim() + "…"
        : value
      : false;
  return (
    <li className="output node" key={`output-${id}-${direction}-${index}`}>
      {display || "Output"}
      <Node id={id} direction={direction} index={index} />
    </li>
  );
}
