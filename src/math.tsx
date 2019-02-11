import React, { useEffect } from "react";
import { Panel } from "./panel";

interface iAdd {
  x: number;
  y: number;
  op: string;
  input: any;
  output: any;
}

export function Math({ x, y, op, input, output }: iAdd) {
  useEffect(() => {
    switch (op) {
      case "add":
        output(input[0] + input[1]);
        break;
      case "multiply":
        output(input[0] * input[1]);
        break;
    }
  });

  const io = [
    <label key={"a"} className="input">
      ({input[0]})
    </label>,
    <label key={"b"} className="output">
      Output
    </label>,
    <label key={"c"} className="input">
      ({input[1]})
    </label>
  ];

  const controls = "Add input 1 and input 2.";

  return <Panel x={x} y={y} title={`Math.${op}`} io={io} controls={controls} />;
}
