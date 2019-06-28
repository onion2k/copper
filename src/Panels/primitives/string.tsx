import React, { useState, useEffect, useRef, useContext } from "react";
import { DispatchContext } from "../../Contexts/dispatch";
import { Panel } from "../../Components/panel";
import { Input } from "../../Components/input";
import { Output } from "../../Components/output";

interface iString {
  id: string;
  title?: string;
  x: number;
  y: number;
  value?: string;
}

export default function Const({ id, title, x, y, value }: iString) {
  const { dispatch } = useContext(DispatchContext);
  const input = useRef([""]);

  const [_value, setValue] = useState(value);
  const [output, setOutput] = useState(_value);

  useEffect(() => {
    dispatch({
      type: "panel/register",
      id: id,
      inputs: input.current,
      output: _value
    });
  }, []);

  useEffect(() => {
    console.log("new out", output);
    dispatch({
      type: "recalculate",
      msg: "string",
      id: id,
      value: output
    });
  }, [output]);

  useEffect(() => {
    console.log("new in", input.current[0] + "\n" + _value);
    setOutput(input.current[0] + "\n" + _value);
  }, [input.current[0]]);

  const inputs = [
    <Input
      key={`input-${id}-0`}
      id={id}
      direction={"in"}
      index={0}
      value={input.current[0]}
      title={"Text"}
    />
  ];

  const outputs = [
    <Output key={id} id={id} direction={"out"} index={null} value={output} />
  ];

  const controls = (
    <textarea
      name={"text"}
      onChange={e => {
        setValue(e.target.value);
        setOutput(input.current[0] + "\n" + _value);
      }}
      defaultValue={_value}
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck={false}
    />
  );

  return (
    <Panel
      key={id}
      id={id}
      x={x}
      y={y}
      title={title || `Text`}
      inputs={inputs}
      outputs={outputs}
      controls={controls}
      nopadding
    />
  );
}
