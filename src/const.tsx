import React, { useState, useEffect } from "react";
import { Panel } from "./panel";

interface iConst {
  x: number;
  y: number;
  output: any;
}

export function Const({ x, y, output }: iConst) {
  const [input, setInput] = useState(0);

  useEffect(() => {
    output(input);
  });

  const updateIo = (e: any) => {
    setInput(parseInt(e.target.value));
  };

  const io = <label className="output">Output ({input})</label>;

  const controls = (
    <input
      type={"range"}
      name={"input"}
      onChange={updateIo}
      style={{ width: "100%" }}
    />
  );

  return <Panel x={x} y={y} title={"Constant"} io={io} controls={controls} />;
}
