import React, { useState, useEffect } from "react";
import { Node } from "./node";

interface iInput {
  id: string;
  direction: string;
  index: number;
  value: number | string;
}

export function Input({ id, direction, index, value }: iInput) {
  const display = typeof value === "number" ? value.toFixed(3) : value;

  return (
    <li className="input node" key={`input-${id}-${direction}-${index}`}>
      ({display})
      <Node
        id={`input-${id}-${direction}-${index}`}
        direction={direction}
        index={index}
      />
    </li>
  );
}
