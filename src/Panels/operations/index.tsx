import React from "react";

const Arithmatic = React.lazy(() => import("./arithmatic"));
const Json = React.lazy(() => import("./json"));
const Trig = React.lazy(() => import("./trig"));
const Split = React.lazy(() => import("./split"));
const Combine = React.lazy(() => import("./combine"));
const Duplicate = React.lazy(() => import("./duplicate"));

const OPERATIONS: { [s: string]: any } = {
  ARITHMATIC: { el: Arithmatic, defaults: { op: "multiply" } },
  JSON: { el: Json },
  TRIG: { el: Trig, defaults: { op: "sin" } },
  SPLIT: { el: Split },
  COMBINE: { el: Combine },
  DUPLICATE: { el: Duplicate }
};

export const OPERATIONS_KEYS = Object.keys(OPERATIONS);

export default OPERATIONS;
