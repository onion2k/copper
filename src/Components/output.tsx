import React, { useState, useEffect } from "react";
import { Connector } from "./connector";

interface iOutput {
  key: string;
  value: number | string;
}

export function Output({ key, value }: iOutput) {
  return (
    <label key={key} className="output">
      ({value})
      <Connector connect={key} />
    </label>
  );
}
