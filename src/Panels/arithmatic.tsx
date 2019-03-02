import React, { useState, useEffect } from "react";
import { Panel } from "../Components/panel";
import { Input } from "../Components/input";
import { Output } from "../Components/output";

interface iArithmatic {
  id: string;
  x: number;
  y: number;
  op: string;
  input: any;
  output: any;
}

export function Arithmatic({ id, x, y, op, input, output }: iArithmatic) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    switch (op) {
      case "add":
        setValue(parseFloat(input[0]) + parseFloat(input[1]));
        output(value);
        break;
      case "multiply":
        setValue(parseFloat(input[0]) * parseFloat(input[1]));
        output(value);
        break;
    }
  });

  const io = [
    <Input id={id} direction={"in"} index={0} value={input[0]} />,
    <Output id={id} direction={"out"} index={0} value={value} />,
    <Input id={id} direction={"in"} index={1} value={input[1]} />
  ];

  const controls = `Add input 1 and input 2.`;

  return <Panel x={x} y={y} title={`Math.${op}`} io={io} controls={controls} />;
}
