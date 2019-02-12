import React, { useState, useEffect } from "react";
import { Panel } from "../Components/panel";
import { Input } from "../Components/input";
import { Output } from "../Components/output";

interface iAdd {
  id: string;
  x: number;
  y: number;
  op: string;
  input: any;
  output: any;
}

export function Math({ id, x, y, op, input, output }: iAdd) {
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
    <Input key={`${id}-i-0`} id={`${id}-i-0`} value={input[0]} />,
    <Output key={`${id}-o-0`} id={`${id}-o-0`} value={"Output"} />,
    <Input key={`${id}-i-1`} id={`${id}-i-1`} value={input[1]} />
  ];

  const controls = "Add input 1 and input 2.";

  return <Panel x={x} y={y} title={`Math.${op}`} io={io} controls={controls} />;
}
