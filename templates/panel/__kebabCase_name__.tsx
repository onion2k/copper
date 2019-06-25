import React, { useState, useRef, useEffect, useContext } from "react";
import { DispatchContext } from "../../src/Contexts/dispatch";
import { Panel } from "../../src/Components/panel";
import { Input } from "../../src/Components/input";
import { Output } from "../../src/Components/output";

interface i{{pascalCase $panel}} {
  id: string;
  title?: string;
  x: number;
  y: number;
}

export default function {{pascalCase $panel}}({ id, title, x, y }: i{{pascalCase $panel}}) {
  const { dispatch } = useContext(DispatchContext);
  const [value, setValue] = useState(0);
  const input = useRef([0, 0]);

  useEffect(() => {
    dispatch({
      type: "panel/register",
      id: id,
      inputs: []
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: "recalculate",
      msg: "{{pascalCase $panel}}",
      id: id,
      value: value
    });
  }, [input.current[0], input.current[1]]);

  const inputs = [
    <Input
      id={id}
      key={`input-${id}-0`}
      direction={"in"}
      index={0}
      value={input.current[0]}
      title={"A"}
    />,
    <Input
      id={id}
      key={`input-${id}-1`}
      direction={"in"}
      index={1}
      value={input.current[1]}
      title={"B"}
    />
  ];

  const outputs = [
    <Output key={id} id={id} direction={"out"} index={null} value={value} />
  ];

  const controls = (
    "Controls"
  );

  return (
    <Panel
      key={id}
      id={id}
      x={x}
      y={y}
      title={title || "{{pascalCase $panel}}" }
      inputs={inputs}
      outputs={outputs}
      controls={controls}
    />
  );
}
