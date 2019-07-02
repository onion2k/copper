import React from "react";
import { Node } from "./node";

interface iInput {
  id: string;
  title?: string;
  direction: string;
  index: number;
  value: number | number[] | string;
  type?: string;
}

export function Input({ id, title, direction, index, value, type }: iInput) {
  const display =
    typeof value === "number"
      ? value.toFixed(3)
      : typeof value === "string"
      ? value.substr(0, 15) + "…"
      : value.join(",");

  return (
    <li className={`input node ${type || "untyped"}`}>
      {title || "Input"} ({display})
      <Node id={id} direction={direction} index={index} />
    </li>
  );
}
