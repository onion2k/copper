import React, { useState, useEffect } from "react";
import { Panel } from "../Components/panel";
import { Output } from "../Components/output";

interface iConst {
  id: string;
  x: number;
  y: number;
  output: any;
}

export function Const({ id, x, y, output }: iConst) {
  const [input, setInput] = useState(0);
  const [connect, setConnect] = useState(false);

  useEffect(() => {
    output(input);
  });

  const updateIo = (e: any) => {
    setInput(parseFloat(e.target.value));
  };

  const io = <Output id={id} direction={"out"} index={0} value={input} />;

  const controls = (
    <input
      type={"range"}
      name={"input"}
      onChange={updateIo}
      style={{ width: "100%" }}
    />
  );

  return <Panel x={x} y={y} title={`Constant`} io={io} controls={controls} />;
}
