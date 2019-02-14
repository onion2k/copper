import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import useAnimationFrame from "../Hooks/useAnimationFrame";
import { Panel } from "../Components/panel";
import { Output } from "../Components/output";

interface iTime {
  id: string;
  x: number;
  y: number;
  output: any;
  initPauseState: boolean;
}

export function Time({ id, x, y, output, initPauseState }: iTime) {
  const [value, setValue] = useState(0);
  const [pause, setPause] = useState(initPauseState);
  const [connect, setConnect] = useState(false);

  useEffect(() => {
    output(value.toFixed(3));
  });

  useAnimationFrame(() => {
    if (!pause) {
      setValue(v => v + 0.01);
    }
  });

  const io = (
    <Output key={`${id}-o-0`} id={`${id}-o-0`} value={value.toFixed(3)} />
  );

  const controls = (
    <button onClick={() => setPause(!pause)} style={{ width: "100%" }}>
      Pause
    </button>
  );

  return <Panel x={x} y={y} title={"Timer"} io={io} controls={controls} />;
}
