import React, { useState, useEffect, useContext } from "react";
import iPanel from "../../Interfaces/panel";

import { DispatchContext } from "../../Contexts/dispatch";
import { Panel } from "../../Components/panel";
import { Output } from "../../Components/output";

export default function Color({ id, title, x, y }: iPanel) {
  const { dispatch } = useContext(DispatchContext);

  const [color, setColor] = useState("#000000");
  const [r, setR] = useState(0);
  const [g, setG] = useState(0);
  const [b, setB] = useState(0);

  useEffect(() => {
    dispatch({
      type: "panel/register",
      id: id,
      inputs: []
    });
  }, [dispatch, id]);

  useEffect(() => {
    setColor(
      `#${r.toString(16).padStart(2, "0")}${g
        .toString(16)
        .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`
    );
    dispatch({
      type: "recalculate",
      msg: "color",
      id: id,
      value: [(r / 255).toFixed(2), (g / 255).toFixed(2), (b / 255).toFixed(2)]
    });
  }, [dispatch, id, r, g, b]);

  const outputs = [
    <Output
      key={id}
      id={id}
      direction={"out"}
      index={0}
      value={color}
      type="vec3"
    />
  ];

  const controls = [
    <input
      type={"range"}
      name={"input"}
      min={0}
      max={255}
      onChange={e => {
        setR(parseInt(e.target.value));
      }}
      style={{ width: "100%" }}
    />,
    <input
      type={"range"}
      name={"input"}
      min={0}
      max={255}
      onChange={e => {
        setG(parseInt(e.target.value));
      }}
      style={{ width: "100%" }}
    />,
    <input
      type={"range"}
      name={"input"}
      min={0}
      max={255}
      onChange={e => {
        setB(parseInt(e.target.value));
      }}
      style={{ width: "100%" }}
    />
  ];

  return (
    <Panel
      key={id}
      id={id}
      x={x}
      y={y}
      title={title || "Color"}
      inputs={null}
      outputs={outputs}
      controls={controls}
    />
  );
}
