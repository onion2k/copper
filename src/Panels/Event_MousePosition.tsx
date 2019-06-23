import React, { useState, useEffect, useRef, useContext } from "react";
import { DispatchContext } from "../Contexts/dispatch";
import { Panel } from "../Components/panel";
import { Output } from "../Components/output";

interface iEventMousePosition {
  id: string;
  title?: string;
  x: number;
  y: number;
}

export default function Event_MousePosition({
  id,
  title,
  x,
  y
}: iEventMousePosition) {
  const { dispatch } = useContext(DispatchContext);
  const [mousePos, setMousePos] = useState([0, 0]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasX = 350;
  const canvasY = 200;

  const input = useRef([0]);

  useEffect(() => {
    dispatch({
      type: "panel/register",
      id: id,
      inputs: input.current
    });
  }, []);

  useEffect(() => {
    if (canvasRef !== null && canvasRef.current !== null) {
      canvasRef.current.addEventListener("mousemove", e => {
        const x = e.offsetX / canvasX;
        const y = e.offsetY / canvasY;
        setMousePos([x, y]);
      });
    }
  }, [canvasRef]);

  useEffect(() => {
    dispatch({
      type: "recalculate",
      msg: "mouse",
      id: id,
      value: [mousePos[0], mousePos[1]]
    });
  }, [mousePos[0], mousePos[1]]);

  useEffect(() => {
    if (canvasRef.current !== null) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#FFF";
        ctx.fillRect(0, 0, canvasX, canvasY);
        ctx.fillStyle = "#000";
        ctx.beginPath();
        ctx.arc(
          mousePos[0] * canvasX,
          mousePos[1] * canvasY,
          5,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    }
  }, [canvasRef, mousePos[0], mousePos[1]]);

  const inputs = null;

  const outputs = [
    <Output
      key={`output-${id}-0`}
      id={id}
      direction={"out"}
      index={0}
      value={mousePos[0]}
    />,
    <Output
      key={`output-${id}-1`}
      id={id}
      direction={"out"}
      index={1}
      value={mousePos[1]}
    />
  ];

  const controls = [
    <canvas
      id={"canvas-mousePosition-0"}
      key={`canvas-mousePosition-0`}
      ref={canvasRef}
      width={canvasX}
      height={canvasY}
      style={{ cursor: "none" }}
    />
  ];

  return (
    <Panel
      key={id}
      id={id}
      x={x}
      y={y}
      title={title || "Mouse Position"}
      inputs={inputs}
      outputs={outputs}
      controls={controls}
      nopadding
    />
  );
}
