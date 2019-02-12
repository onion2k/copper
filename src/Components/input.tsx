import React, { useState, useEffect } from "react";
import { Connector } from "./connector";

interface iInput {
  key: string;
  value: number | string;
}

export function Input({ key, value }: iInput) {
  return (
    <label key={key} className="input">
      ({value})
      <Connector connect={key} />
    </label>
  );
}
