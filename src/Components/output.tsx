import React, { useState, useEffect } from "react";
import { Connector } from "./connector";

interface iOutput {
  key: string;
  id: string;
  value: number | string;
}

export function Output({ key, id, value }: iOutput) {
  return (
    <label key={key} className="output">
      ({value})
      <Connector connectorKey={id} />
    </label>
  );
}
