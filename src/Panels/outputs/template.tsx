import React, { useState, useEffect, useRef, useContext } from "react";
import iPanel from "../../Interfaces/panel";

import { DispatchContext } from "../../Contexts/dispatch";
import { Panel } from "../../Components/panel";
import { Input } from "../../Components/input";
import { Output } from "../../Components/output";

import { template } from "lodash";

interface iTemplate extends iPanel {
  value?: string;
}

// function interpolate(literals: any, ...expressions: any) {
//   let string = ``;
//   for (const [i, val] of expressions.entries()) {
//     string += literals[i] + val;
//   }
//   string += literals[literals.length - 1];
//   return string;
// }

export default function Template({ id, title, x, y, value }: iTemplate) {
  const { dispatch } = useContext(DispatchContext);
  const input = useRef(["", {}]);

  const [_value, setValue] = useState<string>(value || "");
  const [output, setOutput] = useState<string>(_value);
  const [error, setError] = useState<string | null>(null);
  let compiled = useRef<Function>(() => {});

  useEffect(() => {
    dispatch({
      type: "panel/register",
      id: id,
      inputs: input.current,
      output: _value
    });
  }, [dispatch, id, _value]);

  useEffect(() => {
    let c;

    try {
      c = compiled.current(input.current[1]);
    } catch (e) {
      setError(e.message);
      setOutput("");
      return;
    }

    setError(null);
    setOutput(c);

    dispatch({
      type: "recalculate",
      msg: "string",
      id: id,
      value: [c]
    });
  }, [dispatch, id, compiled, input.current[1]]);

  useEffect(() => {
    compiled.current = input.current[0]
      ? template(input.current[0] + "\n" + _value)
      : template(_value);

    let c;
    try {
      c = compiled.current(input.current[1]);
    } catch (e) {
      console.log(_value, "failed");
    }

    setOutput(c);
  }, [input.current[0], _value]);

  const inputs = [
    <Input
      key={`input-${id}-0`}
      id={id}
      direction={"in"}
      index={0}
      value={input.current[0]}
      title={"Template"}
      type="string"
    />,
    <Input
      key={`input-${id}-1`}
      id={id}
      direction={"in"}
      index={1}
      value={input.current[1]}
      title={"Uniforms"}
      type="array"
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
      <div className="template-output">
        {error ? <span>Error: {error}</span> : null}
        {output}
      </div>
    </>
  );

  return (
    <Panel
      key={id}
      id={id}
      x={x}
      y={y}
      title={title || `Template`}
      inputs={inputs}
      outputs={outputs}
      controls={controls}
      nopadding
    />
  );
}
