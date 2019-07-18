import React from "react";

const Const = React.lazy(() => import("./const"));
const Time = React.lazy(() => import("./time"));
const Value = React.lazy(() => import("./value"));
const Color = React.lazy(() => import("./color"));
const String = React.lazy(() => import("./string"));

const PRIMITIVES: { [s: string]: any } = {
  CONST: { el: Const },
  TIME: { el: Time, defaults: { initPauseState: true } },
  VALUE: { el: Value },
  COLOR: { el: Color },
  STRING: { el: String }
};

export const PRIMITIVES_KEYS = Object.keys(PRIMITIVES);

export default PRIMITIVES;
