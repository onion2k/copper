import React from "react";

const Arithmatic = React.lazy(() => import("./arithmatic"));
const Uniforms = React.lazy(() => import("./uniforms"));
const Trig = React.lazy(() => import("./trig"));

const OPERATIONS: { [s: string]: any } = {
  ARITHMATIC: { el: Arithmatic, defaults: { op: "multiply" } },
  UNIFORMS: { el: Uniforms },
  TRIG: { el: Trig, defaults: { op: "sin" } }
};

export default OPERATIONS;
