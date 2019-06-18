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

export default function Value({ id, x, y }: iValue) {
  const { dispatch } = useContext(DispatchContext);

  const input = [0];

  useEffect(() => {
    dispatch({
      type: "panel/register",
      id: id,
      value: input
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: "recalculate",
      msg: "value",
      id: id,
      value: input[0]
    });
  }, [input[0]]);

  const inputs = [
    <Input key={id} id={`${id}`} direction={"in"} index={0} value={input[0]} />
  ];

  const outputs = [
    <Output key={id} id={id} direction={"out"} index={0} value={"Output"} />
  ];

  return (
    <Panel
      key={id}
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
