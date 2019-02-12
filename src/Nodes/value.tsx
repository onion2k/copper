import React, { useEffect } from "react";
import { Panel } from "../Components/panel";
import { Input } from "../Components/input";
import { Output } from "../Components/output";

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

  const io = [
    <Input key={"a"} id={"a"} value={input[0]} />,
    <Output key={"b"} id={"b"} value={"Output"} />
  ];

  return (
    <Panel
      x={x}
      y={y}
      title={"Value"}
      io={io}
      controls={"Display a value from an output."}
    />
  );
}
