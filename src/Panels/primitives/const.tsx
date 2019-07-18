import React, { useState, useEffect, useContext } from "react";
import iPanel from "../../Interfaces/panel";

import { DispatchContext } from "../../Contexts/dispatch";
import { Panel } from "../../Components/panel";
import { Output } from "../../Components/output";

export default function Const({ id, title, x, y }: iPanel) {
  const { dispatch } = useContext(DispatchContext);
  const [value, setValue] = useState(0);

  useEffect(() => {
    dispatch({
      type: "panel/register",
      id: id,
      inputs: []
    });
  }, [dispatch, id]);

  useEffect(() => {
    dispatch({
      type: "recalculate",
      msg: "const",
      id: id,
      value: [value]
    });
  }, [dispatch, id, value]);

  const updateIo = (e: any) => {
    setValue(parseFloat(e.target.value));
  };

  const outputs = [
    <Output
      key={id}
      id={id}
      direction={"out"}
      index={0}
      value={value}
      type="float"
    />
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
      title={title || "Constant"}
      inputs={null}
      outputs={outputs}
      controls={controls}
    />
  );
}
