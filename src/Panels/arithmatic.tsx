import React, { useState, useEffect, useContext } from "react";
import { ConnectorContext } from "../Contexts/connector";
import { Panel } from "../Components/panel";
import { Input } from "../Components/input";
import { Output } from "../Components/output";

interface iArithmatic {
  id: string;
  x: number;
  y: number;
  op: string;
  input: any;
}

export function Arithmatic({ id, x, y, op, input }: iArithmatic) {
  const [
    connector,
    setConnector,
    connectConnector,
    registerNode,
    mouseX,
    mouseY,
    dispatch
  ] = useContext(ConnectorContext);
  const [value, setValue] = useState(0);
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
      type: "update",
      id: id,
      value: value
    });
  });

  const io = [
    <Input id={id} direction={"in"} index={0} value={input[0]} />,
    <Output key={id} id={id} direction={"out"} index={0} value={value} />,
    <Input id={id} direction={"in"} index={1} value={input[1]} />
  ];

  const controls = `Add input 1 and input 2.`;

  return <Panel x={x} y={y} title={`Math.${op}`} io={io} controls={controls} />;
}
