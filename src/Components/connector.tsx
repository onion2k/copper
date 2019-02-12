import React, { useState, useEffect } from "react";

interface iConnector {
  key: string;
}

export function Connector({ key }: iConnector) {
  const [connecting, setConnecting] = useState(false);

  const connect = () => {
    setConnecting(!connecting);
  };

  return (
    <div
      className={`node ${connecting === true ? "connecting" : ""}`}
      onMouseDown={connect}
      onMouseUp={connect}
    />
  );
}
