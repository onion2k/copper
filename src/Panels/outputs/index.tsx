import React from "react";

const Template = React.lazy(() => import("./template"));
const Shader = React.lazy(() => import("./shader"));
const Canvas = React.lazy(() => import("./canvas"));

const OUTPUTS: { [s: string]: any } = {
  TEMPLATE: { el: Template },
  SHADER: { el: Shader },
  CANVAS: { el: Canvas }
};

export const OUTPUTS_KEYS = Object.keys(OUTPUTS);

export default OUTPUTS;
