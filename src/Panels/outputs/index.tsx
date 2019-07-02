import React from "react";

const Template = React.lazy(() => import("./template"));
const Shader = React.lazy(() => import("./shader"));

const OUTPUTS: { [s: string]: any } = {
  TEMPLATE: { el: Template },
  SHADER: { el: Shader }
};

export default OUTPUTS;
