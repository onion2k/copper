import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useContext
} from "react";
import { ConnectorContext } from "../Contexts/connector";
import useAnimationFrame from "../Hooks/useAnimationFrame";
import { Panel } from "../Components/panel";
import { Input } from "../Components/input";
import { Output } from "../Components/output";

interface iSin {
  id: string;
  x: number;
  y: number;
  input?: any;
  output?: any;
}

export function Sin({ id, x, y, input }: iSin) {
  const [
    connector,
    setConnector,
    connectConnector,
    registerNode,
    dispatch
  ] = useContext(ConnectorContext);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [value, setValue] = useState(1);
  const [prev, setPrev] = useState(Array<number>());

  const canvasX = 300;
  const canvasY = 200;

  useEffect(() => {
    setValue(Math.sin(parseFloat(input[0])));
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

  const outputs = [
    <Output key={id} id={id} direction={"out"} index={0} value={value} />
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
    />
  );
}
