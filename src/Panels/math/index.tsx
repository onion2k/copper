import React from "react";

const Maths_Normalize = React.lazy(() => import("./normalize"));

const MATHS: { [s: string]: any } = {
  NORMALIZE: { el: Maths_Normalize }
};

export const MATHS_KEYS = Object.keys(MATHS);

export default MATHS;
