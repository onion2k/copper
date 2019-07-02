import React from "react";

const SHADER_Color = React.lazy(() => import("./color"));
const SHADER_SDF = React.lazy(() => import("./sdf"));
const SHADER_Rings = React.lazy(() => import("./rings"));
const SHADER_Chevron = React.lazy(() => import("./chevron"));
const SHADER_Space = React.lazy(() => import("./space"));
const SHADER_Spiral = React.lazy(() => import("./spiral"));
const SHADER_Swirl = React.lazy(() => import("./swirl"));

const SHADERS: { [s: string]: any } = {
  SHADER_Color: { el: SHADER_Color, title: "Color" },
  SHADER_SDF: { el: SHADER_SDF, title: "SDF Sphere" },
  SHADER_Rings: { el: SHADER_Rings, title: "Rings" },
  SHADER_Chevron: { el: SHADER_Chevron, title: "Chevron" },
  SHADER_Space: { el: SHADER_Space, title: "Space" },
  SHADER_Spiral: { el: SHADER_Spiral, title: "Spiral" },
  SHADER_Swirl: { el: SHADER_Swirl, title: "Swirl" }
};

export default SHADERS;