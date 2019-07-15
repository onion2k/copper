import React from "react";

export const MouseContext = React.createContext<Array<any>>([
  null, // mouseX
  null,
  0, //posx
  0 //posy
]);
