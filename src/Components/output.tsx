import React, { useState, useEffect } from "react";
import { Node } from "./node";

interface iOutput {
  key: string;
  id: string;
  direction: string;
  index: number;
  value: number | string;
}

export function Output({ id, direction, index, value }: iOutput) {
  const display = typeof value === "number" ? value.toFixed(3) : value;
  return (
    <li className="output node" key={`output-${id}-${direction}-${index}`}>
      ({display})
      <Node id={id} direction={direction} index={index} />
    </li>
  );
}
