import React, { useState, useEffect, useRef, useContext } from "react";
import { DispatchContext } from "../../Contexts/dispatch";
import { Panel } from "../../Components/panel";
import { Input } from "../../Components/input";
import { Output } from "../../Components/output";

function api<T>(url: string): Promise<T> {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json() as Promise<T>;
    })
    .then(data => {
      return data;
    });
}

interface iString {
  id: string;
  title?: string;
  x: number;
  y: number;
  url?: string;
}

export default function Http({
  id,
  title,
  x,
  y,
  url = "https://hacker-news.firebaseio.com/v0/user/onion2k.json"
}: iString) {
  const { dispatch } = useContext(DispatchContext);
  const input = useRef([""]);

  const [_url, setUrl] = useState(url);
  const [_value, setValue] = useState("");
  const [output, setOutput] = useState<string | object>({});

  const fire = (e: any) => {
    e.preventDefault();
    if (_url) {
      api(_url).then(data => {
        setOutput(data as object);
      });
    }
  };

  useEffect(() => {
    dispatch({
      type: "panel/register",
      id: id,
      inputs: input.current,
      output: _value
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: "recalculate",
      msg: "string",
      id: id,
      value: output
    });
  }, [output]);

  useEffect(() => {
    setOutput(_value);
  }, [input.current[0]]);

  const inputs = [
    <Input
      key={`input-${id}-0`}
      id={id}
      direction={"in"}
      index={0}
      value={input.current[0]}
      title={"poll"}
      type="float"
    />
  ];

  const outputs = [
    <Output
      key={id}
      id={id}
      direction={"out"}
      index={null}
      value={output}
      type="string"
    />
  ];

  const controls = (
    <>
      <input
        type={"text"}
        name={"url"}
        onChange={e => {
          setUrl(e.target.value);
        }}
        defaultValue={_url}
        placeholder={"https://example.com"}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
      />
      <button name={"fire"} onClick={fire}>
        Fire
      </button>
    </>
  );

  return (
    <Panel
      key={id}
      id={id}
      x={x}
      y={y}
      title={title || `HTTP`}
      inputs={inputs}
      outputs={outputs}
      controls={controls}
    />
  );
}
