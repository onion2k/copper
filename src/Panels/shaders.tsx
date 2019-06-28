import React from "react";

const SHADER_Color = React.lazy(() => import("./shaders/color"));
const SHADER_SDF = React.lazy(() => import("./shaders/sdf"));
const SHADER_Rings = React.lazy(() => import("./shaders/rings"));
const SHADER_Chevron = React.lazy(() => import("./shaders/chevron"));
const SHADER_Space = React.lazy(() => import("./shaders/space"));

const SHADERS: { [s: string]: any } = {
  SHADER_Color: { el: SHADER_Color },
  SHADER_SDF: { el: SHADER_SDF },
  SHADER_Rings: { el: SHADER_Rings },
  SHADER_Chevron: { el: SHADER_Chevron },
  SHADER_Space: { el: SHADER_Space }
};

export default SHADERS;
