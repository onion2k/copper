import React, { useState, useEffect, useRef, useContext } from "react";
import iPanel from "../../Interfaces/panel";

import { DispatchContext } from "../../Contexts/dispatch";
import { Panel } from "../../Components/panel";
import { Input } from "../../Components/input";
import { Output } from "../../Components/output";

export default function Normalize({ id, title, x, y }: iPanel) {
  const { dispatch } = useContext(DispatchContext);
  const [value, setValue] = useState([0]);

  const input = useRef([0]);

  useEffect(() => {
    dispatch({
      type: "panel/register",
      id: id,
      inputs: input.current
    });
  }, [dispatch, id]);

  useEffect(() => {
    const tempValue: any = input.current[0];
    setValue([tempValue]);

    /**
     * Normalize the value
     */

    dispatch({
      type: "recalculate",
      msg: "normalize",
      id: id,
      value: [tempValue]
    });
  }, [dispatch, id]);

  const inputs = [
    <Input
      id={id}
      key={`input-${id}-0`}
      direction={"in"}
      index={0}
      value={input.current[0]}
      title={"A"}
      type="float"
    />
  ];

  const outputs = [
    <Output
      key={`output-${id}-0`}
      id={id}
      direction={"out"}
      index={0}
      value={value[0]}
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
      title={title || "Normalize"}
      inputs={inputs}
      outputs={outputs}
      controls={controls}
    />
  );
}
