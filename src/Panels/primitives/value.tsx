import React, { useEffect, useRef, useContext } from "react";
import { DispatchContext } from "../../Contexts/dispatch";
import { Panel } from "../../Components/panel";
import { Input } from "../../Components/input";
import { Output } from "../../Components/output";

interface iValue {
  id: string;
  title?: string;
  x: number;
  y: number;
}

export default function Value({ id, title, x, y }: iValue) {
  const { dispatch } = useContext(DispatchContext);
  const input = useRef([0]);

  useEffect(() => {
    dispatch({
      type: "panel/register",
      id: id,
      inputs: input.current
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: "recalculate",
      msg: "value",
      id: id,
      value: [input.current[0]]
    });
  }, [input.current[0]]);

  const inputs = [
    <Input
      id={id}
      key={`input-${id}-0`}
      direction={"in"}
      index={0}
      value={input.current[0]}
      type="any"
    />
  ];

  const outputs = [
    <Output
      key={id}
      id={id}
      direction={"out"}
      index={0}
      value={input.current[0]}
      type="any"
    />
  ];

  const controls = <div className="template-output">{input.current[0]}</div>;

  return (
    <Panel
      key={id}
      id={id}
      x={x}
      y={y}
      title={title || "Value"}
      inputs={inputs}
      outputs={outputs}
      controls={controls}
    />
  );
}
