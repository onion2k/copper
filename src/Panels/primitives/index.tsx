import React from "react";

const Const = React.lazy(() => import("./const"));
const Time = React.lazy(() => import("./time"));
const Value = React.lazy(() => import("./value"));
const Color = React.lazy(() => import("./color"));
const String = React.lazy(() => import("./string"));
const Arithmatic = React.lazy(() => import("./arithmatic"));
const Trig = React.lazy(() => import("./trig"));

const PRIMITIVES: { [s: string]: any } = {
  CONST: { el: Const },
  TIME: { el: Time, defaults: { initPauseState: true } },
  VALUE: { el: Value },
  COLOR: { el: Color },
  STRING: { el: String },
  ARITHMATIC: { el: Arithmatic, defaults: { op: "multiply" } },
  TRIG: { el: Trig, defaults: { op: "sin" } }
};

export default PRIMITIVES;
