import React, { useState, useEffect } from "react";
import { Connector } from "./connector";

interface iInput {
  id: string;
  direction: string;
  index: number;
  value: number | string;
}

export function Input({ id, direction, index, value }: iInput) {
  const display = typeof value === "number" ? value.toFixed(3) : value;

  return (
    <li className="input connector">
      <label key={`input-${id}-${direction}-${index}`} className="input">
        ({display})
        <Connector id={id} direction={direction} index={index} />
      </label>
    </li>
  );
}
