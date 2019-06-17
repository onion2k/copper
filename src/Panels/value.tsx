import React, { useEffect, useRef, useContext } from "react";
import { DispatchContext } from "../Contexts/dispatch";
import { Panel } from "../Components/panel";
import { Input } from "../Components/input";
import { Output } from "../Components/output";

import { uniqueID } from "../uniqueID";

interface iValue {
  id: string;
  x: number;
  y: number;
}

export function Value({ id, x, y }: iValue) {
  const { dispatch } = useContext(DispatchContext);

  const input = [0];

  useEffect(() => {
    dispatch({
      type: "recalculate",
      id: id,
      value: input[0]
    });
  }, [input[0]]);

  const outputRef = useRef(uniqueID());

  const inputs = [
    <Input id={`${id}`} direction={"in"} index={0} value={input[0]} />
  ];

  const outputs = [
    <Output
      key={outputRef.current}
      id={outputRef.current}
      direction={"out"}
      index={0}
      value={"Output"}
    />
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
