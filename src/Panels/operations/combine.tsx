import React, { useState, useEffect, useRef, useContext } from "react";
import iPanel from "../../Interfaces/panel";

import { DispatchContext } from "../../Contexts/dispatch";
import { Panel } from "../../Components/panel";
import { Input } from "../../Components/input";
import { Output } from "../../Components/output";

export default function Combine({ id, title, x, y }: iPanel) {
  const { dispatch } = useContext(DispatchContext);
  const [value, setValue] = useState<any>([]);
  const input = useRef([0, 0]);

  useEffect(() => {
    dispatch({
      type: "panel/register",
      id: id,
      inputs: input.current
    });
  }, [dispatch, id]);

  useEffect(() => {
    const tempValue = [input.current[0], input.current[1]];
    setValue(tempValue);
    dispatch({
      type: "recalculate",
      msg: "combine",
      id: id,
      value: [tempValue]
    });
  }, [dispatch, id, input.current[0], input.current[1]]);

  const inputs = [
    <Input
      id={id}
      key={`input-${id}-0`}
      direction={"in"}
      index={0}
      value={input.current[0]}
      title={"A"}
      type="any"
    />,
    <Input
      id={id}
      key={`input-${id}-1`}
      direction={"in"}
      index={1}
      value={input.current[1]}
      title={"B"}
      type="any"
    />
  ];

  const outputs = [
    <Output
      key={`output-${id}-0`}
      id={id}
      direction={"out"}
      index={0}
      value={value}
      type="array"
    />
  ];

  const controls = null;

  return (
    <Panel
      key={id}
      id={id}
      x={x}
      y={y}
      title={title || "Combine Vec2"}
      inputs={inputs}
      outputs={outputs}
      controls={controls}
    />
  );
}
