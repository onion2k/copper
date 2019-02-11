import React, { useEffect } from "react";
import { Panel } from "./panel";

interface iValue {
  x: number;
  y: number;
  input: any;
  output: any;
}

export function Value({ x, y, input, output }: iValue) {
  useEffect(() => {
    output(parseInt(input));
  });
  return (
    <Panel
      x={x}
      y={y}
      title={"Value"}
      io={[
        <label className="input">Input {input[0]}</label>,
        <label className="output">Output</label>
      ]}
      controls={<p>Display a value from an output.</p>}
    />
  );
}
