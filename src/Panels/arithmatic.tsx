import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useContext
} from "react";
import { DispatchContext } from "../Contexts/dispatch";
import { Panel } from "../Components/panel";
import { Input } from "../Components/input";
import { Output } from "../Components/output";
import { uniqueID } from "../uniqueID";

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
  const input = useRef([0, 1]);

  useEffect(() => {
    dispatch({
      type: "panel/register",
      id: id,
      inputs: input.current
    });
  }, []);

  useEffect(() => {
    if (state.inputs[id]) {
      switch (op) {
        case "add":
          setValue(input.current[0] + input.current[1]);
          break;
        case "multiply":
          setValue(input.current[0] * input.current[1]);
          break;
      }
      dispatch({
        type: "recalculate",
        msg: "math",
        id: id,
        value: value
      });
    }
  }, [input.current[0], input.current[1], op]);

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

  const controls = `Add input 1 and input 2.`;

  return (
    <Panel
      key={id}
      id={id}
      x={x}
      y={y}
      title={title || `Math.${op}`}
      inputs={inputs}
      outputs={outputs}
      controls={controls}
    />
  );
}
