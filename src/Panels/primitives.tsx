import React from "react";

const Const = React.lazy(() => import("./primitives/const"));
const Time = React.lazy(() => import("./primitives/time"));
const Value = React.lazy(() => import("./primitives/value"));
const Color = React.lazy(() => import("./primitives/color"));
const String = React.lazy(() => import("./primitives/string"));
const Arithmatic = React.lazy(() => import("./primitives/arithmatic"));
const Trig = React.lazy(() => import("./primitives/trig"));
const Shader = React.lazy(() => import("./primitives/shader"));

const PRIMITIVES: { [s: string]: any } = {
  CONST: { el: Const },
  TIME: { el: Time, defaults: { initPauseState: true } },
  VALUE: { el: Value },
  COLOR: { el: Color },
  STRING: { el: String },
  ARITHMATIC: { el: Arithmatic, defaults: { op: "multiply" } },
  TRIG: { el: Trig },
  SHADER: { el: Shader }
};

export default PRIMITIVES;
