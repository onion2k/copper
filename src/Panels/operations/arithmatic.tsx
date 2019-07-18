import React, { useEffect, useState, useRef, useContext } from "react";
import iPanel from "../../Interfaces/panel";

import { DispatchContext } from "../../Contexts/dispatch";
import { Panel } from "../../Components/panel";
import { Input } from "../../Components/input";
import { Output } from "../../Components/output";

interface iArithmatic extends iPanel {
  op: string;
}

export default function Arithmatic({ id, title, x, y, op }: iArithmatic) {
  const { dispatch } = useContext(DispatchContext);
  const [value, setValue] = useState<number | undefined>(0);
  const [_op, setOp] = useState(op);

  const input = useRef([0, 0]);
  const [input0, input1] = input.current;

  useEffect(() => {
    dispatch({
      type: "panel/register",
      id: id,
      inputs: input.current
    });
  }, [dispatch, id]);

  useEffect(() => {
    // if (state.inputs[id]) {
    let tempValue;
    switch (_op) {
      case "add":
        tempValue = input.current[0] + input.current[1];
        break;
      case "subtract":
        tempValue = input.current[0] - input.current[1];
        break;
      case "multiply":
        tempValue = input.current[0] * input.current[1];
        break;
      case "divide":
        if (input.current[1] > 0) {
          tempValue = input.current[0] / input.current[1];
        } else {
          tempValue = 0;
        }
        break;
    }
    setValue(tempValue);
    dispatch({
      type: "recalculate",
      msg: "math",
      id: id,
      value: [tempValue]
    });
    // }
  }, [dispatch, id, input0, input1, _op]);

  const inputs = [
    <Input
      id={id}
      key={`input-${id}-0`}
      direction={"in"}
      index={0}
      value={input.current[0]}
      title={"A"}
      type="float"
    />,
    <Input
      id={id}
      key={`input-${id}-1`}
      direction={"in"}
      index={1}
      value={input.current[1]}
      title={"B"}
      type="float"
    />
  ];

  const outputs = [
    <Output
      id={id}
      key={`output-${id}-0`}
      direction={"out"}
      index={0}
      value={value}
      type="float"
    />
  ];

  const controls = (
    <select
      onChange={e => {
        setOp(e.target.value);
      }}
      defaultValue={_op}
    >
      <option value={"add"}>Add (A + B)</option>
      <option value={"subtract"}>Subtract (A - B)</option>
      <option value={"multiply"}>Multiply (A * B)</option>
      <option value={"divide"}>Divide (A / B)</option>
    </select>
  );

  return (
    <Panel
      key={id}
      id={id}
      x={x}
      y={y}
      title={_op}
      inputs={inputs}
      outputs={outputs}
      controls={controls}
    />
  );
}
