import React, { useState, useEffect, useRef, useContext } from "react";
import { DispatchContext } from "../Contexts/dispatch";
import { Panel } from "../Components/panel";
import { Input } from "../Components/input";
import { Output } from "../Components/output";
import { uniqueID } from "../uniqueID";

interface iArithmatic {
  id: string;
  x: number;
  y: number;
  op: string;
}

export function Arithmatic({ id, x, y, op }: iArithmatic) {
  const dispatch = useContext(DispatchContext);

  const [value, setValue] = useState(0);

  const input = [0, 0];

  useEffect(() => {
    switch (op) {
      case "add":
        setValue(input[0] + input[1]);
        break;
      case "multiply":
        setValue(input[0] * input[1]);
        break;
    }
    dispatch({
      type: "recalculate",
      id: id,
      value: value
    });
  }, [input[0], input[1], op]);

  const inputs = [
    <Input id={id} direction={"in"} index={0} value={input[0]} />,
    <Input id={id} direction={"in"} index={1} value={input[1]} />
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
