import React, { useState, useEffect, useRef, useContext } from "react";
import { DispatchContext } from "../Contexts/dispatch";
import { Panel } from "../Components/panel";
import { Output } from "../Components/output";

interface iConst {
  id: string;
  title?: string;
  x: number;
  y: number;
  value?: string;
}

export default function Const({ id, title, x, y, value }: iConst) {
  const { dispatch } = useContext(DispatchContext);

  const [_value, setValue] = useState(value);

  useEffect(() => {
    dispatch({
      type: "panel/register",
      id: id,
      inputs: [],
      output: _value
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: "recalculate",
      msg: "const",
      id: id,
      value: _value
    });
  }, [_value]);

  const outputs = [
    <Output key={id} id={id} direction={"out"} index={0} value={_value} />
  ];

  const controls = (
    <textarea
      name={"text"}
      onChange={e => {
        setValue(e.target.value);
      }}
      defaultValue={_value}
    />
  );

  return (
    <Panel
      key={id}
      id={id}
      x={x}
      y={y}
      title={title || `Text`}
      inputs={null}
      outputs={outputs}
      controls={controls}
      nopadding
    />
  );
}
