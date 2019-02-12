import React, { useState, useEffect } from "react";

interface iInput {
  key: string;
  value: number | string;
}

export function Input({ key, value }: iInput) {
  return (
    <label key={key} className="input">
      ({value})
    </label>
  );
}
