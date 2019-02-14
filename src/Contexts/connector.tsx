import React from "react";

export const ConnectorContext = React.createContext<Array<any>>([
  null,
  () => {}, // setConnector
  () => {}, // connectConnector
  () => {} // registerNode
]);
