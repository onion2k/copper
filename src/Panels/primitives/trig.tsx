import React, { useState, useEffect, useRef, useContext } from "react";
import { DispatchContext } from "../../Contexts/dispatch";
import { Panel } from "../../Components/panel";
import { Input } from "../../Components/input";
import { Output } from "../../Components/output";

interface iSin {
  id: string;
  title?: string;
  x: number;
  y: number;
  op: string;
}

export default function Sin({ id, title, x, y, op }: iSin) {
  const { dispatch } = useContext(DispatchContext);
  const [_op, setOp] = useState(op);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [value, setValue] = useState(1);
  const [prev, setPrev] = useState(Array<number>());

  const canvasX = 300;
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
    switch (_op) {
      case "sin":
        setValue(Math.sin(input.current[0]));
        break;
      case "cos":
        setValue(Math.cos(input.current[0]));
        break;
      case "tan":
        setValue(Math.tan(input.current[0]));
        break;
    }
    dispatch({
      type: "recalculate",
      msg: "trig",
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
  }, [input.current[0]]);

  const inputs = [
    <Input
      id={id}
      key={`input-${id}-0`}
      direction={"in"}
      index={0}
      value={input.current[0]}
      title={"A"}
      type="float"
    />
  ];

  const outputs = [
    <Output
      key={`output-${id}-0`}
      id={id}
      direction={"out"}
      index={null}
      value={value.toFixed(3)}
      type="float"
    />
  ];

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
    <>
      <canvas
        id={"canvas-trig-0"}
        key={`canvas-trig-0`}
        ref={canvasRef}
        width={canvasX}
        height={canvasY}
      />
      <div>
        <select
          onChange={e => {
            setOp(e.target.value);
          }}
          defaultValue={_op}
        >
          <option value={"sin"}>Sin</option>
          <option value={"cos"}>Cos</option>
          <option value={"tan"}>Tan</option>
        </select>
      </div>
    </>
  ];

  return (
    <Panel
      key={id}
      id={id}
      x={x}
      y={y}
      title={title || "Trig"}
      inputs={inputs}
      outputs={outputs}
      controls={controls}
      nopadding
    />
  );
}
