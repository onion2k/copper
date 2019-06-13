import React from "react";

export const DispatchContext = React.createContext<Function>(
  () => {} // dispatch
);
