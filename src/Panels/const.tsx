import React, { useState, useEffect, useContext } from "react";
import { ConnectorContext } from "../Contexts/connector";
import { Panel } from "../Components/panel";
import { Output } from "../Components/output";

interface iConst {
  id: string;
  x: number;
  y: number;
}

export default function Const({ id, x, y }: iConst) {
  const [
    connector,
    setConnector,
    connectConnector,
    registerNode,
    mouseX,
    mouseY,
    dispatch
  ] = useContext(ConnectorContext);

  const [value, setValue] = useState(0);
  const [connect, setConnect] = useState(false);

  useEffect(() => {
    dispatch({
      type: "update",
      id: id,
      value: value
    });
  });

  const updateIo = (e: any) => {
    setValue(parseFloat(e.target.value));
  };

  const io = (
    <Output key={id} id={id} direction={"out"} index={0} value={value} />
  );

  const controls = (
    <input
      type={"range"}
      name={"input"}
      onChange={updateIo}
      style={{ width: "100%" }}
    />
  );

  return <Panel x={x} y={y} title={`Constant`} io={io} controls={controls} />;
}
