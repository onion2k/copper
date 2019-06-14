import React, { useState, useEffect, useRef, useContext } from "react";
import { DispatchContext } from "../Contexts/dispatch";
import { Panel } from "../Components/panel";
import { Input } from "../Components/input";
import { Output } from "../Components/output";

import { uniqueID } from "../uniqueID";

interface iSin {
  id: string;
  x: number;
  y: number;
}

export function Sin({ id, x, y }: iSin) {
  const dispatch = useContext(DispatchContext);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [value, setValue] = useState(1);
  const [prev, setPrev] = useState(Array<number>());

  const canvasX = 300;
  const canvasY = 200;

  const input = [0];

  useEffect(() => {
    setValue(Math.sin(input[0]));
    dispatch({
      type: "recalculate",
      id: id,
      value: value
    });

    const tPrev = prev;
    tPrev.unshift(value);
    if (tPrev.length > 140) {
      tPrev.slice(0, 140);
    }
    setPrev(tPrev);

    renderCanvas();
  }, [input[0]]);

  const inputs = [
    <Input id={id} direction={"in"} index={0} value={input[0]} />
  ];

  const outputs = null;

  function renderCanvas() {
    if (canvasRef.current !== null) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#FFF";
        ctx.fillRect(0, 0, canvasX, canvasY);
        ctx.fillStyle = "#000";
        prev.forEach((v, i) => {
          ctx.fillRect(i * 2, canvasY * 0.5 + v * (canvasY * 0.4), 2, 2);
        });
      }
    }
  }

  const controls = [
    <canvas id={"canvas"} ref={canvasRef} width={canvasX} height={canvasY} />
  ];

  return (
    <Panel
      id={id}
      x={x}
      y={y}
      title={`Sin`}
      inputs={inputs}
      outputs={outputs}
      controls={controls}
      nopadding
    />
  );
}
