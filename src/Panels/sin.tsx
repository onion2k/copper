import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import useAnimationFrame from "../Hooks/useAnimationFrame";
import { Panel } from "../Components/panel";
import { Input } from "../Components/input";
import { Output } from "../Components/output";

interface iSin {
  id: string;
  x: number;
  y: number;
  input: any;
  output: any;
}

export function Sin({ id, x, y, input, output }: iSin) {
  const [factor, setFactor] = useState(1);
  const [value, setValue] = useState(1);

  useEffect(() => {
    setValue(Math.sin(parseFloat(input[0]) / factor));
    output(value);
  });

  const updateFactor = (e: any) => {
    setFactor(parseFloat(e.target.value));
  };

  const io = [
    <Input id={id} direction={"in"} index={0} value={input[0]} />,
    <Output id={id} direction={"out"} index={0} value={value} />
  ];

  const controls = (
    <input
      type={"range"}
      name={"factor"}
      onChange={updateFactor}
      style={{ width: "100%" }}
    />
  );

  return <Panel x={x} y={y} title={`Sin`} io={io} controls={controls} />;
}
