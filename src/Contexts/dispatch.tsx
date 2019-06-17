import React from "react";

interface DispatchInterface {
  dispatch: Function;
  state: any;
}

export const DispatchContext = React.createContext<DispatchInterface>({
  dispatch: () => {},
  state: {}
});
