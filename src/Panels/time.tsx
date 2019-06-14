import React, { useState, useEffect, useContext } from "react";
import useAnimationFrame from "../Hooks/useAnimationFrame";
import { DispatchContext } from "../Contexts/dispatch";
import { Panel } from "../Components/panel";
import { Output } from "../Components/output";

interface iTime {
  id: string;
  x: number;
  y: number;
  initPauseState: boolean;
}

export function Time({ id, x, y, initPauseState }: iTime) {
  const dispatch = useContext(DispatchContext);

  const [value, setValue] = useState(0);
  const [pause, setPause] = useState(initPauseState);

  useEffect(() => {
    dispatch({
      type: "recalculate",
      id: id,
      value: value
    });
  }, [value]);

  useAnimationFrame(() => {
    if (!pause) {
      setValue(v => v + 0.01);
    }
  });

  const outputs = [
    <Output
      key={id}
      id={id}
      direction={"out"}
      index={0}
      value={value.toFixed(3)}
    />
  ];

  const controls = <button onClick={() => setPause(!pause)}>Pause</button>;

  return (
    <Panel
      id={id}
      x={x}
      y={y}
      title={`Timer`}
      inputs={null}
      outputs={outputs}
      controls={controls}
    />
  );
}
