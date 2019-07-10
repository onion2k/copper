import React from "react";

const Arithmatic = React.lazy(() => import("./arithmatic"));
const Json = React.lazy(() => import("./json"));
const Trig = React.lazy(() => import("./trig"));
const Split = React.lazy(() => import("./split"));
const Combine = React.lazy(() => import("./combine"));

const OPERATIONS: { [s: string]: any } = {
  ARITHMATIC: { el: Arithmatic, defaults: { op: "multiply" } },
  JSON: { el: Json },
  TRIG: { el: Trig, defaults: { op: "sin" } },
  SPLIT: { el: Split },
  COMBINE: { el: Combine }
};

export default OPERATIONS;
