import React, { useEffect, useState, useRef, useContext } from "react";
import * as twgl from "twgl.js";
import useAnimationFrame from "../../Hooks/useAnimationFrame";
import { DispatchContext } from "../../Contexts/dispatch";
import { Panel } from "../../Components/panel";
import { Input } from "../../Components/input";

import { zipObject } from "lodash";

interface iShader {
  id: string;
  title?: string;
  x: number;
  y: number;
}

export default function Shader({ id, title, x, y }: iShader) {
  const { dispatch } = useContext(DispatchContext);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasX = 700;
  const canvasY = 500;

  const input = useRef([]);

  useEffect(() => {
    dispatch({
      type: "panel/register",
      id: id,
      inputs: input.current
    });
  }, [canvasRef]);

  useEffect(() => {
    // Draw something
  }, [canvasRef, input.current[0], input.current[1]]);

  const inputs = [
    <Input
      key={`input-${id}-0`}
      id={id}
      direction={"in"}
      index={0}
      value={input.current[0]}
      title={"Time"}
      type="float"
    />,
    <Input
      key={`input-${id}-1`}
      id={id}
      direction={"in"}
      index={1}
      value={input.current[1]}
      title={"Functions"}
      type="array"
    />
  ];

  const outputs = null;

  const controls = [
    <canvas
      id={"canvas"}
      key={"canvas-shader-0"}
      ref={canvasRef}
      width={canvasX}
      height={canvasY}
    />
  ];

  return (
    <Panel
      key={id}
      id={id}
      x={x}
      y={y}
      title={title || "Canvas"}
      inputs={inputs}
      outputs={outputs}
      controls={controls}
      nopadding
      medium
    />
  );
}
