import React from "react";

export const ConnectorContext = React.createContext<Array<any>>([
  null, // connector
  () => {}, // setConnector
  () => {}, // connectConnector
  () => {}, // registerNode
  null // dispatch
]);
