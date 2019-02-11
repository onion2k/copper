import React, { useEffect } from "react";
import { Panel } from "./panel";

interface iAdd {
  x: number;
  y: number;
  input: any;
  outputCallback: any;
}

export function Add({ x, y, input, outputCallback }: iAdd) {
  useEffect(() => {
    outputCallback(input[0] + input[1]);
  });

  const io = [
    <label className="input">Input A ({input[0]})</label>,
    <label className="output">Output</label>,
    <label className="input">Input B ({input[1]})</label>
  ];

  const controls = <p>Add input 1 and input 2.</p>;

  return <Panel x={x} y={y} title={"Math.add"} io={io} controls={controls} />;
}
