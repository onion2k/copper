import React, { useEffect, useState, useRef, useContext } from "react";
import { DispatchContext } from "../Contexts/dispatch";
import { Panel } from "../Components/panel";
import { Input } from "../Components/input";
import { Output } from "../Components/output";

interface iArithmatic {
  id: string;
  title?: string;
  x: number;
  y: number;
  op: string;
}

export default function Arithmatic({ id, title, x, y, op }: iArithmatic) {
  const { dispatch, state } = useContext(DispatchContext);
  const [value, setValue] = useState(0);
  const [_op, setOp] = useState(op);
  const input = useRef([0, 0]);

  useEffect(() => {
    dispatch({
      type: "panel/register",
      id: id,
      inputs: input.current
    });
  }, []);

  useEffect(() => {
    if (state.inputs[id]) {
      switch (_op) {
        case "add":
          setValue(input.current[0] + input.current[1]);
          break;
        case "subtract":
          setValue(input.current[0] - input.current[1]);
          break;
        case "multiply":
          setValue(input.current[0] * input.current[1]);
          break;
        case "divide":
          if (input.current[1] > 0) {
            setValue(input.current[0] / input.current[1]);
          } else {
            setValue(0);
          }
          break;
      }
      dispatch({
        type: "recalculate",
        msg: "math",
        id: id,
        value: value
      });
    }
  }, [input.current[0], input.current[1], _op]);

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
    <Output
      id={id}
      key={`output-${id}-0`}
      direction={"out"}
      index={null}
      value={value}
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
      title={`${title}: ${_op}` || `Math.${_op}`}
      inputs={inputs}
      outputs={outputs}
      controls={controls}
    />
  );
}
