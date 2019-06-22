import React, { useState, useEffect, useRef, useContext } from "react";
import { DispatchContext } from "../Contexts/dispatch";
import { Panel } from "../Components/panel";
import { Output } from "../Components/output";

import { uniqueID } from "../uniqueID";

interface iConst {
  id: string;
  title?: string;
  x: number;
  y: number;
}

export default function Const({ id, title, x, y }: iConst) {
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
      msg: "const",
      id: id,
      value: value
    });
  }, [value]);

  const updateIo = (e: any) => {
    setValue(parseFloat(e.target.value));
  };

  const outputs = [
    <Output key={id} id={id} direction={"out"} index={0} value={value} />
  ];

  const controls = (
    <input
      type={"range"}
      name={"input"}
      onChange={updateIo}
      style={{ width: "100%" }}
    />
  );

  return (
    <Panel
      key={id}
      id={id}
      x={x}
      y={y}
      title={title || 'Constant'}
      inputs={null}
      outputs={outputs}
      controls={controls}
    />
  );
}
