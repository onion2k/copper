import React, { useState, useEffect } from "react";

interface iOutput {
  key: string;
  value: number | string;
}

export function Output({ key, value }: iOutput) {
  return (
    <label key={key} className="output">
      ({value})
    </label>
  );
}
