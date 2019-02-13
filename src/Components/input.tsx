import React, { useState, useEffect } from "react";
import { Connector } from "./connector";

interface iInput {
  key: string;
  id: string;
  value: number | string;
}

export function Input({ key, id, value }: iInput) {
  return (
    <label key={key} className="input">
      ({value})
      <Connector connectorKey={id} />
    </label>
  );
}
