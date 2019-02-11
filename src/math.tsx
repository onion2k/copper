import React, { useState, useEffect } from "react";
import { Panel } from "./panel";
import { Input } from "./input";
import { Output } from "./output";

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
    <Input key={"a"} value={input[0]} />,
    <Output key={"b"} value={"Output"} />,
    <Input key={"c"} value={input[1]} />
  ];

  const controls = "Add input 1 and input 2.";

  return <Panel x={x} y={y} title={`Math.${op}`} io={io} controls={controls} />;
}
