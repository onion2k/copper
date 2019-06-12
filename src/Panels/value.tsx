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
    dispatch
  ] = useContext(ConnectorContext);

  useEffect(() => {
    dispatch({
      type: "update",
      id: id,
      value: input[0]
    });
  }, [input[0]]);

  const inputs = [
    <Input id={`${id}`} direction={"in"} index={0} value={input[0]} />
  ];

  const outputs = [
    <Output key={id} id={id} direction={"out"} index={0} value={"Output"} />
  ];

  return (
    <Panel
      id={id}
      x={x}
      y={y}
      title={`Value`}
      inputs={inputs}
      outputs={outputs}
      controls={"Display a value from an output."}
    />
  );
}
