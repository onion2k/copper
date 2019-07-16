import React, { useState, useEffect, useRef, useContext } from "react";
import iPanel from "../../Interfaces/panel";

import { DispatchContext } from "../../Contexts/dispatch";
import { Panel } from "../../Components/panel";
import { Input } from "../../Components/input";
import { Output } from "../../Components/output";

interface iString extends iPanel {
  value: string;
}

export default function String({ id, title, x, y, value }: iString) {
  const { dispatch } = useContext(DispatchContext);
  const [_value, setValue] = useState(value || "");
  const [output, setOutput] = useState(value || "");
  const input = useRef([""]);
  const [input0] = input.current;

  useEffect(() => {
    dispatch({
      type: "panel/register",
      id: id,
      inputs: input.current,
      output: output
    });
  }, [dispatch, id, output]);

  useEffect(() => {
    const tempOutput = input.current[0]
      ? input.current[0] + "\n" + _value
      : _value;
    if (tempOutput !== null) {
      setOutput(tempOutput);
    }
    dispatch({
      type: "recalculate",
      msg: "string",
      id: id,
      value: [tempOutput]
    });
  }, [dispatch, id, input0, _value]);

  const inputs = [
    <Input
      key={`input-${id}-0`}
      id={id}
      direction={"in"}
      index={0}
      value={input.current[0]}
      title={"Text"}
      type="string"
    />
  ];

  const outputs = [
    <Output
      key={id}
      id={id}
      direction={"out"}
      index={0}
      value={output}
      type="string"
    />
  ];

  const controls = (
    <>
      <textarea
        name={"text"}
        onChange={e => {
          setValue(e.target.value);
        }}
        defaultValue={_value}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
      />
      <div className="template-output">{output || ""}</div>
    </>
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
