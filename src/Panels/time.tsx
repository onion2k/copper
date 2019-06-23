import React, { useState, useEffect, useRef, useContext } from "react";
import useAnimationFrame from "../Hooks/useAnimationFrame";
import { DispatchContext } from "../Contexts/dispatch";
import { Panel } from "../Components/panel";
import { Output } from "../Components/output";

import { uniqueID } from "../uniqueID";

interface iTime {
  id: string;
  title: string;
  x: number;
  y: number;
  initPauseState: boolean;
}

export default function Time({ id, title, x, y, initPauseState }: iTime) {
  const { dispatch } = useContext(DispatchContext);

  const [value, setValue] = useState(0);
  const [pause, setPause] = useState(initPauseState);

  useEffect(() => {
    dispatch({
      type: "panel/register",
      id: id,
      inputs: []
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: "recalculate",
      msg: "time",
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
      index={null}
      value={value.toFixed(3)}
    />
  ];

  const controls = <button onClick={() => setPause(!pause)}>Pause</button>;

  return (
    <Panel
      key={id}
      id={id}
      x={x}
      y={y}
      title={title || "timer"}
      inputs={null}
      outputs={outputs}
      controls={controls}
    />
  );
}
