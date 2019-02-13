import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Panel } from "../Components/panel";
import { Output } from "../Components/output";

interface iTime {
  id: string;
  x: number;
  y: number;
  output: any;
}

const useAnimationFrame = callback => {
  const callbackRef = useRef(callback);
  useLayoutEffect(
    () => {
      callbackRef.current = callback;
    },
    [callback]
  );

  const loop = () => {
    frameRef.current = requestAnimationFrame(loop);
    const cb = callbackRef.current;
    cb();
  };

  const frameRef = useRef();
  useLayoutEffect(() => {
    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);
};

export function Time({ id, x, y, output }: iTime) {
  const [value, setValue] = useState(0);
  const [pause, setPause] = useState(false);
  const [connect, setConnect] = useState(false);

  useEffect(() => {
    output(value.toPrecision(3));
  });

  useAnimationFrame(() => {
    if (!pause) {
      setValue(v => v + 0.01);
    }
  });

  const io = (
    <Output key={`${id}-o-0`} id={`${id}-o-0`} value={value.toPrecision(3)} />
  );

  const controls = <button onClick={() => setPause(!pause)}>Pause</button>;

  return <Panel x={x} y={y} title={"Timer"} io={io} controls={controls} />;
}
