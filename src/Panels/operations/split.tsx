import React, { useState, useEffect, useRef, useContext } from "react";
import { DispatchContext } from "../../Contexts/dispatch";
import { Panel } from "../../Components/panel";
import { Input } from "../../Components/input";
import { Output } from "../../Components/output";

interface iSplit {
  id: string;
  title?: string;
  x: number;
  y: number;
}

export default function Event_MousePosition({ id, title, x, y }: iSplit) {
  const { dispatch } = useContext(DispatchContext);
  const [prevMousePos, setPrevMousePos] = useState([0, 0]);
  const [value, setValue] = useState([0, 0]);

  const input = useRef([0]);

  useEffect(() => {
    dispatch({
      type: "panel/register",
      id: id,
      inputs: input.current
    });
  }, []);

  useEffect(() => {
    const tempValue: any = input.current[0];
    setValue(tempValue);
    dispatch({
      type: "recalculate",
      msg: "mouse",
      id: id,
      value: [tempValue[0], tempValue[1]]
    });
  }, [input.current[0]]);

  const inputs = [
    <Input
      id={id}
      key={`input-${id}-0`}
      direction={"in"}
      index={0}
      value={input.current[0]}
      title={"A"}
      type="any"
    />
  ];

  const outputs = [
    <Output
      key={`output-${id}-0`}
      id={id}
      direction={"out"}
      index={0}
      value={value[0]}
      type="float"
    />,
    <Output
      key={`output-${id}-1`}
      id={id}
      direction={"out"}
      index={1}
      value={value[1]}
      type="float"
    />
  ];

  const controls = null;

  return (
    <Panel
      key={id}
      id={id}
      x={x}
      y={y}
      title={title || "Vec2"}
      inputs={inputs}
      outputs={outputs}
      controls={controls}
      nopadding
    />
  );
}
