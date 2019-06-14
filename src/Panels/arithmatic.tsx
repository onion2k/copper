import React, { useState, useEffect, useContext } from "react";
import { DispatchContext } from "../Contexts/dispatch";
import { Panel } from "../Components/panel";
import { Input } from "../Components/input";
import { Output } from "../Components/output";

interface iArithmatic {
  id: string;
  x: number;
  y: number;
  op: string;
  input?: any;
}

export function Arithmatic({ id, x, y, op, input }: iArithmatic) {
  const dispatch = useContext(DispatchContext);

  const [value, setValue] = useState(0);

  useEffect(() => {
    dispatch({
      type: "panelRegister",
      id,
      value: input
    });
  }, []);

  useEffect(() => {
    switch (op) {
      case "add":
        setValue(parseFloat(input[0]) + parseFloat(input[1]));
        break;
      case "multiply":
        setValue(parseFloat(input[0]) * parseFloat(input[1]));
        break;
    }
    dispatch({
      type: "recalculate",
      id: id,
      value: value
    });
  }, [input[0], input[1], op]);

  const inputs = [
    <Input id={`${id}`} direction={"in"} index={0} value={input[0]} />,
    <Input id={`${id}`} direction={"in"} index={1} value={input[1]} />
  ];

  const outputs = [
    <Output key={id} id={id} direction={"out"} index={0} value={value} />
  ];

  const controls = `Add input 1 and input 2.`;

  return (
    <Panel
      id={id}
      x={x}
      y={y}
      title={`Math.${op}`}
      inputs={inputs}
      outputs={outputs}
      controls={controls}
    />
  );
}
