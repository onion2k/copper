import React, { useState, useEffect } from "react";
import { Connector } from "./connector";

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
    <li className="output connector">
      <label key={`output-${id}-${direction}-${index}`} className="output">
        ({display})
        <Connector id={id} direction={direction} index={index} />
      </label>
    </li>
  );
}
