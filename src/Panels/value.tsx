import React, { useEffect } from "react";
import { Panel } from "../Components/panel";
import { Input } from "../Components/input";
import { Output } from "../Components/output";

interface iValue {
  id: string;
  x: number;
  y: number;
  input: any;
  output: any;
}

export function Value({ id, x, y, input, output }: iValue) {
  useEffect(() => {
    output(parseInt(input));
  });

  const io = [
    <Input id={`${id}`} direction={"in"} index={0} value={input[0]} />,
    <Output key={id} id={id} direction={"out"} index={0} value={"Output"} />
  ];

  return (
    <Panel
      x={x}
      y={y}
      title={`Value`}
      io={io}
      controls={"Display a value from an output."}
    />
  );
}
