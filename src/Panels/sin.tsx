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
  const canvasRef = useRef();
  const [factor, setFactor] = useState(1);
  const [value, setValue] = useState(1);
  const [prev, setPrev] = useState([]);

  useEffect(() => {
    setValue(Math.sin(parseFloat(input[0]) / factor));
    output(value);

    const tPrev = prev;
    tPrev.unshift(value);
    if (tPrev.length > 140) {
      tPrev.slice(0, 140);
    }
    setPrev(tPrev);

    renderCanvas();
  });

  const updateFactor = (e: any) => {
    setFactor(parseFloat(e.target.value));
  };

  const io = [
    <Input id={id} direction={"in"} index={0} value={input[0]} />,
    <Output id={id} direction={"out"} index={0} value={value} />
  ];

  function renderCanvas() {
    const ctx = canvasRef.current.getContext("2d");
    ctx.fillStyle = "#FFF";
    ctx.fillRect(0, 0, 280, 100);
    ctx.fillStyle = "#000";
    prev.forEach((v, i) => {
      ctx.fillRect(i * 2, 50 + v * 40, 2, 2);
    });
  }

  const controls = [
    <canvas id={"canvas"} ref={canvasRef} width={280} height={100} />,
    <input
      type={"range"}
      name={"factor"}
      onChange={updateFactor}
      style={{ width: "100%" }}
    />
  ];

  return <Panel x={x} y={y} title={`Sin`} io={io} controls={controls} />;
}