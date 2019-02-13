import React, { useState, useEffect } from "react";
import { Connector } from "./connector";

interface iInput {
  key: string;
  id: string;
  value: number | string;
}

export function Input({ key, id, value }: iInput) {
  const display = typeof value === "number" ? value.toFixed(3) : value;

  return (
    <label key={key} className="input">
      ({display})
      <Connector connectorKey={id} />
    </label>
  );
}
