import React, { useState, useEffect, useRef, useContext } from "react";
import { DispatchContext } from "../../src/Contexts/dispatch";
import { Panel } from "../../src/Components/panel";
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
  }, [value]);

  const updateIo = (e: any) => {
    setValue(parseFloat(e.target.value));
  };

  const outputs = [
    <Output key={id} id={id} direction={"out"} index={null} value={value} />
  ];

  const controls = (
    <input
      type={"range"}
      name={"input"}
      onChange={updateIo}
      style={ { width: "100%" } }
    />
  );

  return (
    <Panel
      key={id}
      id={id}
      x={x}
      y={y}
      title={title || "{{pascalCase $panel}}" }
      inputs={null}
      outputs={outputs}
      controls={controls}
    />
  );
}
