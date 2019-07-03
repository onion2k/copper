import React, { useEffect, useState, useRef, useContext } from "react";
import { DispatchContext } from "../../Contexts/dispatch";
import { Panel } from "../../Components/panel";
import { Input } from "../../Components/input";
import { Output } from "../../Components/output";

import { pick } from "lodash";

interface iArithmatic {
  id: string;
  title?: string;
  x: number;
  y: number;
}

export default function Arithmatic({ id, title, x, y }: iArithmatic) {
  const { dispatch, state } = useContext(DispatchContext);
  const [value, setValue] = useState({});
  const input = useRef([]);

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
      msg: "uniforms",
      id: id,
      value: pick(input.current[0], ["id", "karma"])
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
      type="array"
    />
  ];

  const outputs = [
    <Output
      id={id}
      key={`output-${id}-0`}
      direction={"out"}
      index={null}
      value={value}
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
      title={"Uniforms"}
      inputs={inputs}
      outputs={outputs}
      controls={controls}
    />
  );
}
