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
        <label key="a" className="input">
          {input[0]}
        </label>,
        <label key="b" className="output">
          Output
        </label>
      ]}
      controls={"Display a value from an output."}
    />
  );
}
