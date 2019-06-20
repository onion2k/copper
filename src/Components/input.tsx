import React, { useState, useEffect } from "react";
import { Node } from "./node";

interface iInput {
  id: string;
  title?: string;
  direction: string;
  index: number;
  value: number | string;
}

export function Input({ id, title, direction, index, value }: iInput) {
  const display =
    typeof value === "number"
      ? value.toFixed(3)
      : typeof value === "string"
      ? value.substr(0, 15) + "…"
      : "";

  return (
    <li className="input node" key={`input-${id}-${direction}-${index}`}>
      {title || "Input"} ({display})
      <Node id={id} direction={direction} index={index} />
    </li>
  );
}
