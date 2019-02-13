import React, { useState, useEffect } from "react";
import { Connector } from "./connector";

interface iOutput {
  key: string;
  id: string;
  value: number | string;
}

export function Output({ key, id, value }: iOutput) {
  const display = typeof value === "number" ? value.toFixed(3) : value;
  return (
    <label key={key} className="output">
      ({display})
      <Connector connectorKey={id} />
    </label>
  );
}
