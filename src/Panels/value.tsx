import React, { useEffect, useContext } from "react";
import { ConnectorContext } from "../Contexts/connector";
import { Panel } from "../Components/panel";
import { Input } from "../Components/input";
import { Output } from "../Components/output";

interface iValue {
  id: string;
  x: number;
  y: number;
  input?: any;
  output?: any;
}

export function Value({ id, x, y, input }: iValue) {
  const [
    connector,
    setConnector,
    connectConnector,
    registerNode,
    mouseX,
    mouseY,
    dispatch
  ] = useContext(ConnectorContext);

  useEffect(() => {
    dispatch({
      type: "update",
      id: id,
      value: input[0]
    });
  });

  const io = [
    <Input id={`${id}`} direction={"in"} index={0} value={input[0]} />,
    <Output key={id} id={id} direction={"out"} index={0} value={"Output"} />
  ];

  return (
    <Panel
      x={x}
      y={y}
      title={`Value`}
      io={io}
      controls={"Display a value from an output."}
    />
  );
}
