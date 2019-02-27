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
        output(parseFloat(input[0]) + parseFloat(input[1]));
        break;
      case "multiply":
        output(parseFloat(input[0]) * parseFloat(input[1]));
        break;
    }
  });

  const io = [
    <Input id={id} direction={"in"} index={0} value={input[0]} />,
    <Output id={id} direction={"out"} index={0} value={"output"} />,
    <Input id={id} direction={"in"} index={1} value={input[1]} />
  ];

  const controls = `Add input 1 and input 2.`;

  return (
    <Panel x={x} y={y} title={`Math.${op} ${id}`} io={io} controls={controls} />
  );
}
